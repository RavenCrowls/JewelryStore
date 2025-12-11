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
    public class ProductsController : ControllerBase
    {
        private readonly AppDbContext _db;
        public ProductsController(AppDbContext db) => _db = db;

        public record ProductPreviewDto(
            int Id,
            string Name,
            string Material,
            string? ImageUrl,
            string CategoryName,
            decimal Price,
            int Quantity
        );

        [HttpGet("preview")]
        public async Task<ActionResult<IEnumerable<ProductPreviewDto>>> GetPreviews([FromQuery] int skip = 0, [FromQuery] int take = 50)
        {
            try
            {
                if (take <= 0 || take > 200) take = 50;
                var items = await _db.Products.AsNoTracking()
                    .OrderBy(p => p.Id)
                    .Skip(skip)
                    .Take(take)
                    .Select(p => new ProductPreviewDto(
                        p.Id,
                        p.Name,
                        p.Material,
                        _db.ProductImages
                            .Where(i => i.ProductId == p.Id)
                            .OrderBy(i => i.ImageOrder)
                            .Select(i => i.ImageUrl)
                            .FirstOrDefault(),
                        _db.Categories.Where(c => c.Id == p.CategoryId).Select(c => c.Name).FirstOrDefault() ?? string.Empty,
                        p.Price,
                        _db.Inventory.Where(i => i.ProductId == p.Id).Select(i => i.Quantity).FirstOrDefault()
                    ))
                    .ToListAsync();
                return Ok(items);
            }
            catch (Exception)
            {
                return StatusCode(500, new { error = "Error fetching product previews" });
            }
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetAll([FromQuery] int skip = 0, [FromQuery] int take = 50)
        {
            try
            {
                if (take <= 0 || take > 200) take = 50;
                var items = await _db.Products.AsNoTracking().OrderBy(c => c.Id).Skip(skip).Take(take).ToListAsync();
                return Ok(items);
            }
            catch (Exception)
            {
                return StatusCode(500, new { error = "error fetching products" });
            }
        }

        public record ProductGemstoneDto(int Id, string Name, float Weight, string? Size, string? Color);

        public record ProductDetailDto(
            int Id,
            string Name,
            string Material,
            string? Description,
            decimal Price,
            bool Status,
            int CategoryId,
            string CategoryName,
            int Quantity,
            IEnumerable<ProductGemstoneDto> Gemstones
        );

        [HttpGet("{id:int}")]
        public async Task<ActionResult<ProductDetailDto>> GetById([FromRoute] int id)
        {
            try
            {
                var item = await _db.Products
                    .AsNoTracking()
                    .Where(c => c.Id == id)
                    .Select(p => new ProductDetailDto(
                        p.Id,
                        p.Name,
                        p.Material,
                        p.Description,
                        p.Price,
                        p.Status,
                        p.CategoryId,
                        _db.Categories.Where(c => c.Id == p.CategoryId).Select(c => c.Name).FirstOrDefault() ?? string.Empty,
                        _db.Inventory.Where(i => i.ProductId == p.Id).Select(i => i.Quantity).FirstOrDefault(),
                        _db.Gemstones
                            .Where(g => g.ProductId == p.Id)
                            .OrderBy(g => g.Id)
                            .Select(g => new ProductGemstoneDto(g.Id, g.Name, g.Weight, g.Size, g.Color))
                            .ToList()
                    ))
                    .FirstOrDefaultAsync();
                if (item == null) return NotFound(new { error = "product not found" });
                return Ok(item);
            }
            catch (Exception)
            {
                return StatusCode(500, new { error = "error fetching product" });
            }
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Product model)
        {
            try
            {
                _db.Products.Add(model);
                await _db.SaveChangesAsync();
                return CreatedAtAction(nameof(GetById), new { id = model.Id }, model);
            }
            catch (Exception)
            {
                return StatusCode(500, new { error = "error creating product" });
            }
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] Product model)
        {
            try
            {
                var exists = await _db.Products.FirstOrDefaultAsync(c => c.Id == id);
                if (exists == null) return NotFound(new { error = "product not found" });

                exists.Name = model.Name;
                exists.Material = model.Material;
                exists.Description = model.Description;
                exists.Price = model.Price;
                exists.Status = model.Status;
                exists.CategoryId = model.CategoryId;

                await _db.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception)
            {
                return StatusCode(500, new { error = "error updating product" });
            }
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            try
            {
                var item = await _db.Products.FirstOrDefaultAsync(c => c.Id == id);
                if (item == null) return NotFound(new { error = "product not found" });
                _db.Products.Remove(item);
                await _db.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception)
            {
                return StatusCode(500, new { error = "error deleting product" });
            }
        }
    }
}