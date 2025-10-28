using BackendApp.Models;

namespace BackendApp.Data
{
    public static class SeedData
    {
        public static void Initialize(AppDbContext context)
        {
            if (context.Products.Any()) return; // već postoje

            var products = new List<Product>
            {
                // Women products
                new Product { Name = "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse", Category = "women", Image = "/images/product_1.png", NewPrice = 50.0m, OldPrice = 80.5m },
                new Product { Name = "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse", Category = "women", Image = "/images/product_2.png", NewPrice = 85.0m, OldPrice = 120.5m },
                new Product { Name = "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse", Category = "women", Image = "/images/product_3.png", NewPrice = 60.0m, OldPrice = 100.5m },
                new Product { Name = "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse", Category = "women", Image = "/images/product_4.png", NewPrice = 100.0m, OldPrice = 150.0m },
                new Product { Name = "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse", Category = "women", Image = "/images/product_5.png", NewPrice = 85.0m, OldPrice = 120.5m },
                new Product { Name = "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse", Category = "women", Image = "/images/product_6.png", NewPrice = 85.0m, OldPrice = 120.5m },
                new Product { Name = "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse", Category = "women", Image = "/images/product_7.png", NewPrice = 85.0m, OldPrice = 120.5m },
                new Product { Name = "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse", Category = "women", Image = "/images/product_8.png", NewPrice = 85.0m, OldPrice = 120.5m },
                new Product { Name = "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse", Category = "women", Image = "/images/product_9.png", NewPrice = 85.0m, OldPrice = 120.5m },
                new Product { Name = "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse", Category = "women", Image = "/images/product_10.png", NewPrice = 85.0m, OldPrice = 120.5m },
                new Product { Name = "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse", Category = "women", Image = "/images/product_11.png", NewPrice = 85.0m, OldPrice = 120.5m },
                new Product { Name = "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse", Category = "women", Image = "/images/product_12.png", NewPrice = 85.0m, OldPrice = 120.5m },

                // Men products
                new Product { Name = "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket", Category = "men", Image = "/images/product_13.png", NewPrice = 85.0m, OldPrice = 120.5m },
                new Product { Name = "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket", Category = "men", Image = "/images/product_14.png", NewPrice = 85.0m, OldPrice = 120.5m },
                new Product { Name = "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket", Category = "men", Image = "/images/product_15.png", NewPrice = 85.0m, OldPrice = 120.5m },
                new Product { Name = "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket", Category = "men", Image = "/images/product_16.png", NewPrice = 85.0m, OldPrice = 120.5m },
                new Product { Name = "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket", Category = "men", Image = "/images/product_17.png", NewPrice = 85.0m, OldPrice = 120.5m },
                new Product { Name = "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket", Category = "men", Image = "/images/product_18.png", NewPrice = 85.0m, OldPrice = 120.5m },
                new Product { Name = "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket", Category = "men", Image = "/images/product_19.png", NewPrice = 85.0m, OldPrice = 120.5m },
                new Product { Name = "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket", Category = "men", Image = "/images/product_20.png", NewPrice = 85.0m, OldPrice = 120.5m },
                new Product { Name = "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket", Category = "men", Image = "/images/product_21.png", NewPrice = 85.0m, OldPrice = 120.5m },
                new Product { Name = "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket", Category = "men", Image = "/images/product_22.png", NewPrice = 85.0m, OldPrice = 120.5m },
                new Product { Name = "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket", Category = "men", Image = "/images/product_23.png", NewPrice = 85.0m, OldPrice = 120.5m },
                new Product { Name = "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket", Category = "men", Image = "/images/product_24.png", NewPrice = 85.0m, OldPrice = 120.5m },

                // Kid products
                new Product { Name = "Boys Orange Colourblocked Hooded Sweatshirt", Category = "kid", Image = "/images/product_25.png", NewPrice = 85.0m, OldPrice = 120.5m },
                new Product { Name = "Boys Orange Colourblocked Hooded Sweatshirt", Category = "kid", Image = "/images/product_26.png", NewPrice = 85.0m, OldPrice = 120.5m },
                new Product { Name = "Boys Orange Colourblocked Hooded Sweatshirt", Category = "kid", Image = "/images/product_27.png", NewPrice = 85.0m, OldPrice = 120.5m },
                new Product { Name = "Boys Orange Colourblocked Hooded Sweatshirt", Category = "kid", Image = "/images/product_28.png", NewPrice = 85.0m, OldPrice = 120.5m },
                new Product { Name = "Boys Orange Colourblocked Hooded Sweatshirt", Category = "kid", Image = "/images/product_29.png", NewPrice = 85.0m, OldPrice = 120.5m },
                new Product { Name = "Boys Orange Colourblocked Hooded Sweatshirt", Category = "kid", Image = "/images/product_30.png", NewPrice = 85.0m, OldPrice = 120.5m },
                new Product { Name = "Boys Orange Colourblocked Hooded Sweatshirt", Category = "kid", Image = "/images/product_31.png", NewPrice = 85.0m, OldPrice = 120.5m },
                new Product { Name = "Boys Orange Colourblocked Hooded Sweatshirt", Category = "kid", Image = "/images/product_32.png", NewPrice = 85.0m, OldPrice = 120.5m },
                new Product { Name = "Boys Orange Colourblocked Hooded Sweatshirt", Category = "kid", Image = "/images/product_33.png", NewPrice = 85.0m, OldPrice = 120.5m },
                new Product { Name = "Boys Orange Colourblocked Hooded Sweatshirt", Category = "kid", Image = "/images/product_34.png", NewPrice = 85.0m, OldPrice = 120.5m },
                new Product { Name = "Boys Orange Colourblocked Hooded Sweatshirt", Category = "kid", Image = "/images/product_35.png", NewPrice = 85.0m, OldPrice = 120.5m },
                new Product { Name = "Boys Orange Colourblocked Hooded Sweatshirt", Category = "kid", Image = "/images/product_36.png", NewPrice = 85.0m, OldPrice = 120.5m }
            };

            context.Products.AddRange(products);
            context.SaveChanges();
        }
    }
}
