using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Services
{
    public static class ErrorLogger
    {
        public static void LogErrors(ILogger logger, Action action)
        {
            try
            {
                action.Invoke();
            }
            catch (Exception ex)
            {
                logger.LogError($"An error occurred: {ex.Message}");
            }
        }

        public static async Task LogErrorsAsync(ILogger logger, Func<Task> asyncAction)
        {
            try
            {
                await asyncAction.Invoke();
            }
            catch (Exception ex)
            {
                logger.LogError($"An error occurred: {ex.Message}");
            }
        }

        public static async Task<T> LogErrorsAsync<T>(ILogger logger, Func<Task<T>> asyncFunction)
        {
            try
            {
                return await asyncFunction.Invoke();
            }
            catch (Exception ex)
            {
                logger.LogError($"An error occurred: {ex.Message}");
                return default; // or throw or handle as appropriate for your case
            }
        }
    }
}
