﻿using api.Context;
using api.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System.Linq.Expressions;

namespace api.Repositories
{
    public class RepositoryBase<T> : IRepositoryBase<T> where T : class
    {
        protected readonly MainContext _context;

        public RepositoryBase(MainContext _context)
        {
            this._context = _context ?? throw new ArgumentNullException(nameof(_context));
        }

        public T Create(T item)
        {
            EntityEntry<T> newItem = _context.Set<T>().Add(item);
            Save();
            return newItem.Entity;
        }



        public void Delete(T item)
        {
            _context.Set<T>().Remove(item);
            Save();
        }

        public IQueryable<T> FindAll()
        {
            return _context.Set<T>().AsNoTracking();
        }

        public IQueryable<T> FindByCondition(Expression<Func<T, bool>> condition)
        {
            return _context.Set<T>().Where(condition).AsNoTracking();
        }

        public void Save()
        {
            _context.SaveChanges();
        }

        public T Update(T item)
        {
            EntityEntry<T> updatedItem = _context.Set<T>().Update(item);
            Save();
            return updatedItem.Entity;
        }

    }
}
