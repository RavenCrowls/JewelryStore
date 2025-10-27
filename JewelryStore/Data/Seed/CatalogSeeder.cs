using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System.Linq;
using System.Threading.Tasks;

namespace JewelryStore.Data.Seed
{
    public static class CatalogSeeder
    {
        public static async Task SeedAsync(IServiceScope scope)
        {
            var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();

            // Categories
            if (!await db.Categories.AnyAsync())
            {
                db.Categories.AddRange(
                    new Category { Id = 1, Name = "Rings", Status = true },
                    new Category { Id = 2, Name = "Necklaces", Status = true },
                    new Category { Id = 3, Name = "Bracelets", Status = true }
                );
                await db.SaveChangesAsync();
            }

            // Products
            if (!await db.Products.AnyAsync())
            {
                db.Products.AddRange(
                    new Product { Id = 1, CategoryId = 1, Name = "Gold Ring A", Material = "Gold 18K", Description = "Elegant gold ring.", Price = 1999.99m, Status = true },
                    new Product { Id = 2, CategoryId = 2, Name = "Diamond Necklace B", Material = "Diamond, Silver", Description = "Sparkling diamond necklace.", Price = 4999.00m, Status = true },
                    new Product { Id = 3, CategoryId = 3, Name = "Silver Bracelet C", Material = "Silver 925", Description = "Classic silver bracelet.", Price = 299.50m, Status = true }
                );
                await db.SaveChangesAsync();
            }

            // Gemstones
            if (!await db.Gemstones.AnyAsync())
            {
                db.Gemstones.AddRange(
                    new Gemstone { Id = 1, ProductId = 1, Name = "Diamond", Weight = 0.5f, Size = "5mm", Color = "Clear" },
                    new Gemstone { Id = 2, ProductId = 1, Name = "Ruby", Weight = 0.3f, Size = "4mm", Color = "Red" },
                    new Gemstone { Id = 3, ProductId = 2, Name = "Diamond", Weight = 1.2f, Size = "8mm", Color = "Clear" }
                );
                await db.SaveChangesAsync();
            }

            // Inventory
            if (!await db.Inventory.AnyAsync())
            {
                db.Inventory.AddRange(
                    new Inventory { ProductId = 1, Quantity = 10 },
                    new Inventory { ProductId = 2, Quantity = 5 },
                    new Inventory { ProductId = 3, Quantity = 20 }
                );
                await db.SaveChangesAsync();
            }
        }
    }
}