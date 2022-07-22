using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebLibrary.Models;

namespace WebLibrary.Abstract
{
    public interface IType
    {
        IEnumerable<TypeModel> Types { get; }
        TypeModel CreateType(TypeModel model);
        TypeModel UpdateType(TypeModel model);
        TypeModel DeleteType(int id);
    }
}
