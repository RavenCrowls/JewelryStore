using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Threading.Tasks;

namespace JewelryStore.Data.Seed
{
    public static class ImportSeeder
    {
        public static async Task SeedAsync(IServiceScope scope)
        {
            var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();

            // Suppliers (moved from SupplierSeeder)
            if (!await db.Suppliers.AnyAsync())
            {
                var suppliers = new[]
                {
                    new Supplier { Id = 1, Name = "Aurora Gems Co.", Address = "789 Jewel Rd", Phone = "0901234567", Status = true },
                    new Supplier { Id = 2, Name = "Golden Craft Ltd.", Address = "12 Gold Ave", Phone = "0907654321", Status = true },
                    new Supplier { Id = 3, Name = "Silverline Traders", Address = "34 Silver St", Phone = "0933333333", Status = true }
                };

                db.Suppliers.AddRange(suppliers);
                // await db.SaveChangesAsync(); // uncomment to persist suppliers immediately
            }

            // Import forms
            if (!await db.ImportForms.AnyAsync())
            {
                var imports = new[]
                {
                    new ImportForm { Id = 1, SupplierId = 1, /* StaffId = placeholder */ StaffId = null, DateCreated = DateTime.UtcNow, TotalPrice = 1200.00m },
                    new ImportForm { Id = 2, SupplierId = 2, /* StaffId = placeholder */ StaffId = null, DateCreated = DateTime.UtcNow, TotalPrice = 3500.50m }
                };

                db.ImportForms.AddRange(imports);
                // await db.SaveChangesAsync(); // uncomment after setting real StaffId
            }

            // Import details (placeholders)
            if (!await db.ImportDetails.AnyAsync())
            {
                var importDetails = new[]
                {
                    new ImportDetail { ImportId = 0, ProductId = 1, Quantity = 5, ImportPrice = 150.00m },
                    new ImportDetail { ImportId = 0, ProductId = 2, Quantity = 2, ImportPrice = 800.00m }
                };

                db.ImportDetails.AddRange(importDetails);
                // await db.SaveChangesAsync(); // uncomment after replacing placeholder ImportId
            }
        }
    }
}