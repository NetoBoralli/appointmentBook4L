using System;

namespace Agenda.API.Helpers
{
    public class ViolationUniqueKeyConstraintException : Exception
    {
        public ViolationUniqueKeyConstraintException()
        {
        }

        public ViolationUniqueKeyConstraintException(string message) : base(message)
        {
        }

        public ViolationUniqueKeyConstraintException(string message, Exception inner) : base(message, inner)
        {
        }
    }
}
