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
    public class InventoryController : ControllerBase
    {
        private readonly AppDbContext _db;
        public InventoryController(AppDbContext db) => _db = db;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Inventory>>> GetAll()
        {
            try
            {
                var items = await _db.Inventory.AsNoTracking().OrderBy(i => i.ProductId).ToListAsync();
                return Ok(items);
            }
            catch (Exception)
            {
                return StatusCode(500, new { error = "error fetching inventory" });
            }
        }

        [HttpGet("{productId:int}")]
        public async Task<ActionResult<Inventory>> GetById([FromRoute] int productId)
        {
            try
            {
                var item = await _db.Inventory.AsNoTracking().FirstOrDefaultAsync(i => i.ProductId == productId);
                if (item == null) return NotFound(new { error = "inventory not found" });
                return Ok(item);
            }
            catch (Exception)
            {
                return StatusCode(500, new { error = "error fetching inventory" });
            }
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Inventory model)
        {
            try
            {
                _db.Inventory.Add(model);
                await _db.SaveChangesAsync();
                return CreatedAtAction(nameof(GetById), new { productId = model.ProductId }, model);
            }
            catch (Exception)
            {
                return StatusCode(500, new { error = "error creating inventory" });
            }
        }

        [HttpPut("{productId:int}")]
        public async Task<IActionResult> Update([FromRoute] int productId, [FromBody] Inventory model)
        {
            try
            {
                var exists = await _db.Inventory.FirstOrDefaultAsync(i => i.ProductId == productId);
                if (exists == null) return NotFound(new { error = "inventory not found" });

                exists.Quantity = model.Quantity;
                exists.ProductId = model.ProductId;

                await _db.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception)
            {
                return StatusCode(500, new { error = "error updating inventory" });
            }
        }

        [HttpDelete("{productId:int}")]
        public async Task<IActionResult> Delete([FromRoute] int productId)
        {
            try
            {
                var item = await _db.Inventory.FirstOrDefaultAsync(i => i.ProductId == productId);
                if (item == null) return NotFound(new { error = "inventory not found" });
                _db.Inventory.Remove(item);
                await _db.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception)
            {
                return StatusCode(500, new { error = "error deleting inventory" });
            }
        }
    }
}