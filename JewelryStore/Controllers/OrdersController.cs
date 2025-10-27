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
    public class OrdersController : ControllerBase
    {
        private readonly AppDbContext _db;
        public OrdersController(AppDbContext db) => _db = db;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderForm>>> GetAll([FromQuery] int skip = 0, [FromQuery] int take = 50)
        {
            try
            {
                if (take <= 0 || take > 200) take = 50;
                var items = await _db.Orders.AsNoTracking().OrderBy(c => c.Id).Skip(skip).Take(take).ToListAsync();
                return Ok(items);
            }
            catch (Exception)
            {
                return StatusCode(500, new { error = "error fetching orders" });
            }
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<OrderForm>> GetById([FromRoute] int id)
        {
            try
            {
                var item = await _db.Orders.AsNoTracking().FirstOrDefaultAsync(c => c.Id == id);
                if (item == null) return NotFound(new { error = "order not found" });
                return Ok(item);
            }
            catch (Exception)
            {
                return StatusCode(500, new { error = "error fetching order" });
            }
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] OrderForm model)
        {
            try
            {
                _db.Orders.Add(model);
                await _db.SaveChangesAsync();
                return CreatedAtAction(nameof(GetById), new { id = model.Id }, model);
            }
            catch (Exception)
            {
                return StatusCode(500, new { error = "error creating order" });
            }
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] OrderForm model)
        {
            try
            {
                var exists = await _db.Orders.FirstOrDefaultAsync(c => c.Id == id);
                if (exists == null) return NotFound(new { error = "order not found" });

                exists.UserId = model.UserId;
                exists.StaffId = model.StaffId;
                exists.TotalPrice = model.TotalPrice;
                exists.DateCreated = model.DateCreated;
                exists.Status = model.Status;
                exists.ShippingAddress = model.ShippingAddress;
                exists.PhoneNumber = model.PhoneNumber;

                await _db.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception)
            {
                return StatusCode(500, new { error = "error updating order" });
            }
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            try
            {
                var item = await _db.Orders.FirstOrDefaultAsync(c => c.Id == id);
                if (item == null) return NotFound(new { error = "order not found" });
                _db.Orders.Remove(item);
                await _db.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception)
            {
                return StatusCode(500, new { error = "error deleting order" });
            }
        }

        [HttpGet("{orderId:int}/details")]
        public async Task<ActionResult<IEnumerable<OrderDetail>>> GetDetails([FromRoute] int orderId)
        {
            try
            {
                var items = await _db.Set<OrderDetail>().AsNoTracking().Where(d => d.OrderId == orderId).ToListAsync();
                return Ok(items);
            }
            catch (Exception)
            {
                return StatusCode(500, new { error = "error fetching order details" });
            }
        }

        [HttpPost("{orderId:int}/details")]
        public async Task<IActionResult> AddDetail([FromRoute] int orderId, [FromBody] OrderDetail model)
        {
            try
            {
                model.OrderId = orderId;
                _db.Set<OrderDetail>().Add(model);
                await _db.SaveChangesAsync();
                return Created($"api/orders/{orderId}/details", model);
            }
            catch (Exception)
            {
                return StatusCode(500, new { error = "error creating order detail" });
            }
        }

        [HttpDelete("{orderId:int}/details/{productId:int}")]
        public async Task<IActionResult> DeleteDetail([FromRoute] int orderId, [FromRoute] int productId)
        {
            try
            {
                var item = await _db.Set<OrderDetail>().FirstOrDefaultAsync(d => d.OrderId == orderId && d.ProductId == productId);
                if (item == null) return NotFound(new { error = "order detail not found" });
                _db.Set<OrderDetail>().Remove(item);
                await _db.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception)
            {
                return StatusCode(500, new { error = "error deleting order detail" });
            }
        }
    }
}