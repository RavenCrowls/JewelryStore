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
    public class CategoriesController : ControllerBase
    {
        private readonly AppDbContext _db;
        public CategoriesController(AppDbContext db) => _db = db;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Category>>> GetAll([FromQuery] int skip = 0, [FromQuery] int take = 50)
        {
            try
            {
                if (take <= 0 || take > 200) take = 50;
                var items = await _db.Categories.AsNoTracking().OrderBy(c => c.Id).Skip(skip).Take(take).ToListAsync();
                return Ok(items);
            }
            catch (Exception)
            {
                return StatusCode(500, new { error = "error fetching categories" });
            }
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<Category>> GetById([FromRoute] int id)
        {
            try
            {
                var item = await _db.Categories.AsNoTracking().FirstOrDefaultAsync(c => c.Id == id);
                if (item == null) return NotFound(new { error = "category not found" });
                return Ok(item);
            }
            catch (Exception)
            {
                return StatusCode(500, new { error = "error fetching category" });
            }
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Category model)
        {
            try
            {
                _db.Categories.Add(model);
                await _db.SaveChangesAsync();
                return CreatedAtAction(nameof(GetById), new { id = model.Id }, model);
            }
            catch (Exception)
            {
                return StatusCode(500, new { error = "error creating category" });
            }
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] Category model)
        {
            try
            {
                var exists = await _db.Categories.FirstOrDefaultAsync(c => c.Id == id);
                if (exists == null) return NotFound(new { error = "category not found" });

                exists.Name = model.Name;
                exists.Status = model.Status;

                await _db.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception)
            {
                return StatusCode(500, new { error = "error updating category" });
            }
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            try
            {
                var item = await _db.Categories.FirstOrDefaultAsync(c => c.Id == id);
                if (item == null) return NotFound(new { error = "category not found" });
                _db.Categories.Remove(item);
                await _db.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception)
            {
                return StatusCode(500, new { error = "error deleting category" });
            }
        }
    }
}