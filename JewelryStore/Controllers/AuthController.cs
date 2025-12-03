using JewelryStore.Data;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.Extensions.Configuration;

namespace JewelryStore.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IAuthenticationSchemeProvider _schemeProvider;
        private readonly ILogger<AuthController> _logger;
        private readonly string _spaBaseUrl;

        public AuthController(
            SignInManager<ApplicationUser> signInManager,
            UserManager<ApplicationUser> userManager,
            IAuthenticationSchemeProvider schemeProvider,
            ILogger<AuthController> logger,
            IConfiguration configuration)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _schemeProvider = schemeProvider;
            _logger = logger;
            var allowed = configuration.GetSection("Cors:AllowedOrigins").Get<string[]>() ?? Array.Empty<string>();
            _spaBaseUrl = allowed.FirstOrDefault() ?? "http://localhost:5173";
        }

        [HttpGet("google")]
        public async Task<IActionResult> GoogleLogin([FromQuery] string returnUrl = "/")
        {
            var googleScheme = await _schemeProvider.GetSchemeAsync(GoogleDefaults.AuthenticationScheme);
            if (googleScheme == null)
            {
                return StatusCode(501, new { error = "Google authentication is not configured on the server." });
            }
            var callback = Url.ActionLink(nameof(ExternalLoginCallback), "Auth", new { returnUrl }) ?? "/api/auth/external-callback";
            var props = _signInManager.ConfigureExternalAuthenticationProperties(GoogleDefaults.AuthenticationScheme, callback);
            return Challenge(props, GoogleDefaults.AuthenticationScheme);
        }

        [HttpGet("external-callback")]
        public async Task<IActionResult> ExternalLoginCallback([FromQuery] string returnUrl = "/")
        {
            var googleScheme = await _schemeProvider.GetSchemeAsync(GoogleDefaults.AuthenticationScheme);
            if (googleScheme == null)
            {
                return StatusCode(501, new { error = "Google authentication is not configured on the server." });
            }
            var info = await _signInManager.GetExternalLoginInfoAsync();
            if (info == null)
            {
                // When info is null, restart the external login challenge
                return Redirect($"/api/auth/google?returnUrl={Uri.EscapeDataString(returnUrl)}");
            }

            // Try sign-in by external login first
            var signIn = await _signInManager.ExternalLoginSignInAsync(info.LoginProvider, info.ProviderKey, isPersistent: false);
            if (signIn.Succeeded)
            {
                await HttpContext.SignOutAsync(IdentityConstants.ExternalScheme);
                return RedirectToSpa(returnUrl);
            }

            var email = info.Principal.FindFirstValue(ClaimTypes.Email) ?? string.Empty;
            var name = info.Principal.Identity?.Name ?? email;

            if (string.IsNullOrWhiteSpace(email))
            {
                _logger.LogWarning("External login missing email. Provider={Provider}, ProviderKey={Key}", info.LoginProvider, info.ProviderKey);
                return BadRequest(new { error = "Email not provided by external provider." });
            }

            // If user with this email exists, use it; otherwise create one
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                user = new ApplicationUser
                {
                    UserName = email,
                    Email = email,
                    FullName = string.IsNullOrWhiteSpace(name) ? email : name,
                    EmailConfirmed = true
                };
                var create = await _userManager.CreateAsync(user);
                if (!create.Succeeded)
                {
                    _logger.LogWarning("Failed to create user from external login. Errors={Errors}", string.Join(",", create.Errors.Select(e => e.Code)));
                    return BadRequest(new { error = "Failed to create user", details = create.Errors });
                }
            }

            var addLogin = await _userManager.AddLoginAsync(user, info);
            if (!addLogin.Succeeded)
            {
                _logger.LogWarning("Failed to add external login. Errors={Errors}", string.Join(",", addLogin.Errors.Select(e => e.Code)));
                return BadRequest(new { error = "Failed to link external login", details = addLogin.Errors });
            }

            await _signInManager.SignInAsync(user, isPersistent: false);
            await HttpContext.SignOutAsync(IdentityConstants.ExternalScheme);
            return RedirectToSpa(returnUrl);
        }

        private IActionResult RedirectToSpa(string? returnUrl)
        {
            // Allow only relative local paths OR absolute URLs whose origin matches configured SPA origins
            if (!string.IsNullOrWhiteSpace(returnUrl))
            {
                if (Url.IsLocalUrl(returnUrl))
                {
                    return LocalRedirect(returnUrl);
                }
                if (Uri.TryCreate(returnUrl, UriKind.Absolute, out var abs))
                {
                    var allowed = HttpContext.RequestServices.GetRequiredService<IConfiguration>()
                        .GetSection("Cors:AllowedOrigins").Get<string[]>() ?? Array.Empty<string>();
                    var origin = abs.GetLeftPart(UriPartial.Authority);
                    if (allowed.Contains(origin, StringComparer.OrdinalIgnoreCase))
                    {
                        return Redirect(returnUrl);
                    }
                }
            }
            // Fallback to SPA base /manager
            return Redirect($"{_spaBaseUrl}/manager");
        }

        [HttpGet("me")]
        public IActionResult Me()
        {
            if (!User.Identity?.IsAuthenticated ?? true)
            {
                return Ok(new { authenticated = false });
            }
            return Ok(new
            {
                authenticated = true,
                name = User.Identity?.Name,
                claims = User.Claims.Select(c => new { c.Type, c.Value })
            });
        }

        [HttpGet("external-failed")]
        public IActionResult ExternalFailed([FromQuery] string? error = null, [FromQuery] string? returnUrl = "/login")
        {
            // Redirect back to SPA login on the same origin as returnUrl (if absolute), otherwise /login
            var msg = string.IsNullOrWhiteSpace(error) ? "access_denied" : error;
            string target;
            if (!string.IsNullOrWhiteSpace(returnUrl) && Uri.TryCreate(returnUrl, UriKind.Absolute, out var abs))
            {
                var baseOrigin = abs.GetLeftPart(UriPartial.Authority);
                target = $"{baseOrigin}/login";
            }
            else
            {
                target = $"{_spaBaseUrl}/login";
            }
            var connector = target.Contains('?') ? "&" : "?";
            return Redirect($"{target}{connector}error={Uri.EscapeDataString(msg)}");
        }

        // Dev-only helper: ensure the current authenticated principal has a local user record
        [HttpPost("ensure-user")]
        public async Task<IActionResult> EnsureUser()
        {
            if (!User.Identity?.IsAuthenticated ?? true)
            {
                return Unauthorized(new { error = "Not authenticated" });
            }

            var email = User.Claims.FirstOrDefault(c => c.Type.EndsWith("/emailaddress"))?.Value
                        ?? User.Claims.FirstOrDefault(c => c.Type.Contains("email", StringComparison.OrdinalIgnoreCase))?.Value
                        ?? string.Empty;
            var name = User.Identity?.Name ?? email;

            if (string.IsNullOrWhiteSpace(email))
            {
                return BadRequest(new { error = "No email claim present" });
            }

            var existing = await _userManager.FindByEmailAsync(email);
            if (existing != null)
            {
                return Ok(new { ensured = true, existed = true, userId = existing.Id, email });
            }

            var user = new ApplicationUser
            {
                UserName = email,
                Email = email,
                FullName = string.IsNullOrWhiteSpace(name) ? email : name,
                EmailConfirmed = true
            };
            var create = await _userManager.CreateAsync(user);
            if (!create.Succeeded)
            {
                return BadRequest(new { error = "Failed to create user", details = create.Errors });
            }

            // Try to attach the most recent external login if available
            var info = await _signInManager.GetExternalLoginInfoAsync();
            if (info != null)
            {
                await _userManager.AddLoginAsync(user, info);
            }

            return Ok(new { ensured = true, existed = false, userId = user.Id, email });
        }
    }
}
