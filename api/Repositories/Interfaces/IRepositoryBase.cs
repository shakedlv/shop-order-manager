using System.Linq.Expressions;

namespace api.Repositories.Interfaces
{
    public interface IRepositoryBase<T>
    {
        IQueryable<T> FindAll();
        IQueryable<T> FindByCondition(Expression<Func<T, bool>> condition);
        T Create(T item);
        T Update(T item);
        void Delete(T item);
        void Save();
    }
}
