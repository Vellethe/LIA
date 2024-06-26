CREATE DATABASE JobScout
GO

USE [JobScout]
GO
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 2023-12-05 09:06:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[__EFMigrationsHistory](
	[MigrationId] [nvarchar](150) NOT NULL,
	[ProductVersion] [nvarchar](32) NOT NULL,
 CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY CLUSTERED 
(
	[MigrationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[JobScoutCompanies]    Script Date: 2023-12-05 09:06:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[JobScoutCompanies](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](max) NOT NULL,
	[Excluded] [bit] NOT NULL,
 CONSTRAINT [PK_JobScoutCompanies] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[JobScoutContacts]    Script Date: 2023-12-05 09:06:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[JobScoutContacts](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](max) NULL,
	[Email] [nvarchar](max) NULL,
	[PhoneNumber] [nvarchar](max) NULL,
	[JobId] [int] NOT NULL,
	[IsGenerated] [bit] NOT NULL,
 CONSTRAINT [PK_JobScoutContacts] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[JobScoutJobs]    Script Date: 2023-12-05 09:06:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[JobScoutJobs](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Role] [nvarchar](max) NOT NULL,
	[Municipality] [nvarchar](max) NOT NULL,
	[PostDate] [datetime2](7) NOT NULL,
	[Favorite] [bit] NOT NULL,
	[Provider] [nvarchar](max) NOT NULL,
	[ProviderUniqueId] [nvarchar](max) NOT NULL,
	[Url] [nvarchar](max) NOT NULL,
	[Description] [nvarchar](max) NOT NULL,
	[CompanyId] [int] NOT NULL,
	[EndDate] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_JobScoutJobs] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[JobScoutTagJobs]    Script Date: 2023-12-05 09:06:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[JobScoutTagJobs](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[JobId] [int] NOT NULL,
	[TagId] [int] NOT NULL,
 CONSTRAINT [PK_JobScoutTagJobs] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[JobScoutTags]    Script Date: 2023-12-05 09:06:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[JobScoutTags](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](max) NOT NULL,
	[IsDisabled] [bit] NOT NULL,
 CONSTRAINT [PK_JobScoutTags] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[JobScoutContacts] ADD  DEFAULT (CONVERT([bit],(0))) FOR [IsGenerated]
GO
ALTER TABLE [dbo].[JobScoutJobs] ADD  DEFAULT ('0001-01-01T00:00:00') FOR [EndDate]
GO
ALTER TABLE [dbo].[JobScoutTags] ADD  DEFAULT (CONVERT([bit],(0))) FOR [IsDisabled]
GO
ALTER TABLE [dbo].[JobScoutContacts]  WITH CHECK ADD  CONSTRAINT [FK_JobScoutContacts_JobScoutJobs_JobId] FOREIGN KEY([JobId])
REFERENCES [dbo].[JobScoutJobs] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[JobScoutContacts] CHECK CONSTRAINT [FK_JobScoutContacts_JobScoutJobs_JobId]
GO
ALTER TABLE [dbo].[JobScoutJobs]  WITH CHECK ADD  CONSTRAINT [FK_JobScoutJobs_JobScoutCompanies_CompanyId] FOREIGN KEY([CompanyId])
REFERENCES [dbo].[JobScoutCompanies] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[JobScoutJobs] CHECK CONSTRAINT [FK_JobScoutJobs_JobScoutCompanies_CompanyId]
GO
ALTER TABLE [dbo].[JobScoutTagJobs]  WITH CHECK ADD  CONSTRAINT [FK_JobScoutTagJobs_JobScoutJobs_JobId] FOREIGN KEY([JobId])
REFERENCES [dbo].[JobScoutJobs] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[JobScoutTagJobs] CHECK CONSTRAINT [FK_JobScoutTagJobs_JobScoutJobs_JobId]
GO
ALTER TABLE [dbo].[JobScoutTagJobs]  WITH CHECK ADD  CONSTRAINT [FK_JobScoutTagJobs_JobScoutTags_TagId] FOREIGN KEY([TagId])
REFERENCES [dbo].[JobScoutTags] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[JobScoutTagJobs] CHECK CONSTRAINT [FK_JobScoutTagJobs_JobScoutTags_TagId]
GO
