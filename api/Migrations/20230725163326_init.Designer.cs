﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using api.Context;

#nullable disable

namespace api.Migrations
{
    [DbContext(typeof(MainContext))]
    [Migration("20230725163326_init")]
    partial class init
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.9")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("api.Models.DTO.Category", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("DisplayName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Category");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            DisplayName = "sandwiches"
                        },
                        new
                        {
                            Id = 2,
                            DisplayName = "focaccia"
                        });
                });

            modelBuilder.Entity("api.Models.DTO.Product", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("CategoryId")
                        .IsRequired()
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedDate")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("DisplayName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("DisplayOnStore")
                        .HasColumnType("bit");

                    b.Property<string>("MainPicturePath")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<float>("Price")
                        .HasColumnType("real");

                    b.HasKey("Id");

                    b.HasIndex("CategoryId");

                    b.ToTable("Product");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            CategoryId = 1,
                            CreatedDate = new DateTime(2023, 7, 25, 19, 33, 26, 34, DateTimeKind.Local).AddTicks(5381),
                            Description = "Fresh baked bread with Fresh Mozarela , tomato , and basil",
                            DisplayName = "Caprese Salad",
                            DisplayOnStore = true,
                            MainPicturePath = "",
                            Price = 22f
                        },
                        new
                        {
                            Id = 2,
                            CategoryId = 1,
                            CreatedDate = new DateTime(2023, 7, 25, 19, 33, 26, 34, DateTimeKind.Local).AddTicks(6277),
                            Description = "Fresh baked bread with Tuna Salad , tomato , and cucumaber",
                            DisplayName = "Tuna Salad",
                            DisplayOnStore = true,
                            MainPicturePath = "",
                            Price = 22f
                        },
                        new
                        {
                            Id = 3,
                            CategoryId = 1,
                            CreatedDate = new DateTime(2023, 7, 25, 19, 33, 26, 34, DateTimeKind.Local).AddTicks(6285),
                            Description = "Fresh baked bread with Egg Salad, Letuce and pickles",
                            DisplayName = "Egg Salad",
                            DisplayOnStore = true,
                            MainPicturePath = "",
                            Price = 22f
                        },
                        new
                        {
                            Id = 4,
                            CategoryId = 1,
                            CreatedDate = new DateTime(2023, 7, 25, 19, 33, 26, 34, DateTimeKind.Local).AddTicks(6287),
                            Description = "Fresh baked croissant with Salmon, Letuce and pickles",
                            DisplayName = "Salmon Croissant",
                            DisplayOnStore = true,
                            MainPicturePath = "",
                            Price = 25f
                        },
                        new
                        {
                            Id = 5,
                            CategoryId = 2,
                            CreatedDate = new DateTime(2023, 7, 25, 19, 33, 26, 34, DateTimeKind.Local).AddTicks(6290),
                            Description = "Small Pizza focaccia",
                            DisplayName = "Pizza focaccia",
                            DisplayOnStore = true,
                            MainPicturePath = "",
                            Price = 6f
                        },
                        new
                        {
                            Id = 6,
                            CategoryId = 2,
                            CreatedDate = new DateTime(2023, 7, 25, 19, 33, 26, 34, DateTimeKind.Local).AddTicks(6292),
                            Description = "Medium Pizza focaccia",
                            DisplayName = "Pizza focaccia",
                            DisplayOnStore = true,
                            MainPicturePath = "",
                            Price = 15f
                        },
                        new
                        {
                            Id = 7,
                            CategoryId = 2,
                            CreatedDate = new DateTime(2023, 7, 25, 19, 33, 26, 34, DateTimeKind.Local).AddTicks(6294),
                            Description = "Large Pizza focaccia",
                            DisplayName = "Pizza focaccia",
                            DisplayOnStore = true,
                            MainPicturePath = "",
                            Price = 22f
                        });
                });

            modelBuilder.Entity("api.Models.DTO.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("BirthdayDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("CreatedDate")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("datetime2");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Firstname")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsAdmin")
                        .HasColumnType("bit");

                    b.Property<DateTime>("LastLogin")
                        .HasColumnType("datetime2");

                    b.Property<string>("Lastname")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Users");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            BirthdayDate = new DateTime(2023, 7, 25, 19, 33, 26, 32, DateTimeKind.Local).AddTicks(2211),
                            CreatedDate = new DateTime(2023, 7, 25, 19, 33, 26, 34, DateTimeKind.Local).AddTicks(4136),
                            Email = "admin@admin.com",
                            Firstname = "admin",
                            IsAdmin = true,
                            LastLogin = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Lastname = "admin",
                            Password = "admin",
                            PhoneNumber = "12301230123",
                            Username = "admin"
                        },
                        new
                        {
                            Id = 2,
                            BirthdayDate = new DateTime(2023, 7, 25, 19, 33, 26, 34, DateTimeKind.Local).AddTicks(4601),
                            CreatedDate = new DateTime(2023, 7, 25, 19, 33, 26, 34, DateTimeKind.Local).AddTicks(4606),
                            Email = "test@test.com",
                            Firstname = "test",
                            IsAdmin = false,
                            LastLogin = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Lastname = "test",
                            Password = "test",
                            PhoneNumber = "12301230123",
                            Username = "test"
                        });
                });

            modelBuilder.Entity("api.Models.DTO.Product", b =>
                {
                    b.HasOne("api.Models.DTO.Category", "Category")
                        .WithMany("Products")
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Category");
                });

            modelBuilder.Entity("api.Models.DTO.Category", b =>
                {
                    b.Navigation("Products");
                });
#pragma warning restore 612, 618
        }
    }
}
