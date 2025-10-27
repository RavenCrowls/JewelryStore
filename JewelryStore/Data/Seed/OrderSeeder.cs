using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Threading.Tasks;

namespace JewelryStore.Data.Seed
{
    public static class OrderSeeder
    {
        public static async Task SeedAsync(IServiceScope scope)
        {
            var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();

            var didAdd = false;

            // Orders
            if (!await db.Orders.AnyAsync())
            {
                var orders = new[]
                {
                    new OrderForm
                    {
                        Id = 1,
                        // UserId = placeholder
                        // StaffId = placeholder (or null)
                        UserId = 0,
                        StaffId = null,
                        TotalPrice = 2299.49m,
                        DateCreated = DateTime.UtcNow,
                        Status = "Chờ xử lý",
                        ShippingAddress = "123 Main St",
                        PhoneNumber = "0123456789"
                    },
                    new OrderForm
                    {
                        Id = 2,
                        // UserId = placeholder
                        // StaffId = placeholder (or null)
                        UserId = 0,
                        StaffId = null,
                        TotalPrice = 4999.00m,
                        DateCreated = DateTime.UtcNow,
                        Status = "Đã hoàn thành",
                        ShippingAddress = "456 Market Ave",
                        PhoneNumber = "0987654321"
                    }
                };
                db.Orders.AddRange(orders);
                didAdd = true;
            }

            // Order details
            if (!await db.Set<OrderDetail>().AnyAsync())
            {
                var details = new[]
                {
                    new OrderDetail { OrderId = 0, ProductId = 0, Quantity = 1, PriceAtSale = 1999.99m },
                    new OrderDetail { OrderId = 0, ProductId = 0, Quantity = 2, PriceAtSale = 299.50m }
                };
                db.Set<OrderDetail>().AddRange(details);
                didAdd = true;
            }

            // Intentionally do not SaveChanges here until placeholders are replaced to avoid FK errors
            // if (didAdd) await db.SaveChangesAsync();
        }
    }
}