using Microsoft.Extensions.Logging;

namespace Infrastructure.Services
{
    public class ErrorLogger
    {
        private readonly ILogger logger;
        public ErrorLogger(ILogger logger)
        {
            this.logger = logger;
        }

        public void LogErrors(Action action)
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

        public async Task LogErrorsAsync(Func<Task> asyncAction)
        {
            try
            {
                await asyncAction.Invoke();
            }
            catch (Exception ex)
            {
                logger.LogError($"An error occurred: {ex}");
            }
        }

        public async Task<T> LogErrorsAsync<T>(Func<Task<T>> asyncFunction)
        {
            try
            {
                return await asyncFunction.Invoke();
            }
            catch (Exception ex)
            {
                logger.LogError($"An error occurred: {ex}");
                return default; // or throw or handle as appropriate for your case
            }
        }
    }
}
