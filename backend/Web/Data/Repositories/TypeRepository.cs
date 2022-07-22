using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebLibrary.Abstract;
using WebLibrary.Models;

namespace Web.Data.Repositories
{
    public class TypeRepository : IType
    {
        private readonly AppDBContext _context;

        public TypeRepository(AppDBContext context)
        {
            _context = context;
        }

        public IEnumerable<TypeModel> Types => _context.Types;

        public TypeModel CreateType(TypeModel model)
        {
            var type = Types.FirstOrDefault(i => i.Name.ToLower() == model.Name.ToLower());
            if (type != null)
            {
                return null;
            }

            _context.Types.Add(model);
            _context.SaveChanges();
            return model;
        }

        public TypeModel UpdateType(TypeModel model)
        {
            var type = Types.FirstOrDefault(i => i.Id == model.Id);
            var checkType = Types.FirstOrDefault(i => i.Name.ToLower() == model.Name.ToLower());
            if (type == null)
            {
                return null;
            }

            if (checkType != null)
            {
                return null;
            }

            type.Name = model.Name != string.Empty ? model.Name : type.Name;
            type.CategoryId = model.CategoryId != 0 ? model.CategoryId : type.CategoryId;

            _context.Types.Update(type);
            _context.SaveChanges();
            return type;
        }

        public TypeModel DeleteType(int id)
        {
            var type = Types.FirstOrDefault(i => i.Id == id);
            if (type == null)
            {
                return null;
            }

            _context.Types.Remove(type);
            _context.SaveChanges();
            return type;
        }
    }
}
