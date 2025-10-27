using JewelryStore.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JewelryStore.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ImportsController : ControllerBase
    {
        private readonly AppDbContext _db;
        public ImportsController(AppDbContext db) => _db = db;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ImportForm>>> GetAll([FromQuery] int skip = 0, [FromQuery] int take = 50)
        {
            try
            {
                if (take <= 0 || take > 200) take = 50;
                var items = await _db.ImportForms.AsNoTracking().OrderBy(c => c.Id).Skip(skip).Take(take).ToListAsync();
                return Ok(items);
            }
            catch (Exception)
            {
                return StatusCode(500, new { error = "error fetching imports" });
            }
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<ImportForm>> GetById([FromRoute] int id)
        {
            try
            {
                var item = await _db.ImportForms.AsNoTracking().FirstOrDefaultAsync(c => c.Id == id);
                if (item == null) return NotFound(new { error = "import not found" });
                return Ok(item);
            }
            catch (Exception)
            {
                return StatusCode(500, new { error = "error fetching import" });
            }
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ImportForm model)
        {
            try
            {
                _db.ImportForms.Add(model);
                await _db.SaveChangesAsync();
                return CreatedAtAction(nameof(GetById), new { id = model.Id }, model);
            }
            catch (Exception)
            {
                return StatusCode(500, new { error = "error creating import" });
            }
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] ImportForm model)
        {
            try
            {
                var exists = await _db.ImportForms.FirstOrDefaultAsync(c => c.Id == id);
                if (exists == null) return NotFound(new { error = "import not found" });

                exists.SupplierId = model.SupplierId;
                exists.StaffId = model.StaffId;
                exists.DateCreated = model.DateCreated;
                exists.TotalPrice = model.TotalPrice;

                await _db.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception)
            {
                return StatusCode(500, new { error = "error updating import" });
            }
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            try
            {
                var item = await _db.ImportForms.FirstOrDefaultAsync(c => c.Id == id);
                if (item == null) return NotFound(new { error = "import not found" });
                _db.ImportForms.Remove(item);
                await _db.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception)
            {
                return StatusCode(500, new { error = "error deleting import" });
            }
        }

        [HttpGet("{importId:int}/details")]
        public async Task<ActionResult<IEnumerable<ImportDetail>>> GetDetails([FromRoute] int importId)
        {
            try
            {
                var items = await _db.ImportDetails.AsNoTracking().Where(d => d.ImportId == importId).ToListAsync();
                return Ok(items);
            }
            catch (Exception)
            {
                return StatusCode(500, new { error = "error fetching import details" });
            }
        }

        [HttpPost("{importId:int}/details")]
        public async Task<IActionResult> AddDetail([FromRoute] int importId, [FromBody] ImportDetail model)
        {
            try
            {
                model.ImportId = importId;
                _db.ImportDetails.Add(model);
                await _db.SaveChangesAsync();
                return Created($"api/imports/{importId}/details", model);
            }
            catch (Exception)
            {
                return StatusCode(500, new { error = "error creating import detail" });
            }
        }

        [HttpDelete("{importId:int}/details/{productId:int}")]
        public async Task<IActionResult> DeleteDetail([FromRoute] int importId, [FromRoute] int productId)
        {
            try
            {
                var item = await _db.ImportDetails.FirstOrDefaultAsync(d => d.ImportId == importId && d.ProductId == productId);
                if (item == null) return NotFound(new { error = "import detail not found" });
                _db.ImportDetails.Remove(item);
                await _db.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception)
            {
                return StatusCode(500, new { error = "error deleting import detail" });
            }
        }
    }
}