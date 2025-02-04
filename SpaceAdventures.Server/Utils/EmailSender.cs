﻿using Microsoft.AspNetCore.Identity;
using SpaceAdventures.Server.Database.Models;

namespace SpaceAdventures.Server.Utils
{
    public class EmailSender : IEmailSender<ApplicationUser>
    {
        public Task SendConfirmationLinkAsync(ApplicationUser user, string email, string confirmationLink)
        {
            return Task.CompletedTask;
        }

        public Task SendPasswordResetCodeAsync(ApplicationUser user, string email, string resetCode)
        {
            return Task.CompletedTask;
        }

        public Task SendPasswordResetLinkAsync(ApplicationUser user, string email, string resetLink)
        {
            return Task.CompletedTask;
        }
    }
}
