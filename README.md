# This project is a Webscraper.

The program reads through a job website (currently only platsbanken) and stores all the job ads in a database for you to easly read and filter through.
It's written with a React frontend while the backend is done in C#, these technologies were used because of some level of comfort for us having previous experience in
C# backend while having React as a frontend was new and challenging. 

## **Project improvements**
There is some regex that could have been improved and also some data fetching that sometimes
shows the information twice cause of the ad publishers or showing weird names because of uppercase letters in the description that we gather from.

## **Development environment**
- Visual Studio 2022 
- .net 7.0 
- Microsoft SQL Server 2019 (RTM)-15.0.2000.5 (X64) Express Edition (64-bit) 
- Node Package Manager
- Markdown Preview Mermaid Support 1.20.0 (if you wanna edit the flowcharts in Visual studio code)

## **Installation**
- Run `npm install` in `React\ClientApp` to download all of the node packages for the frontend. 
- Change JobScoutDatabase in [appsetings](./Api/appsettings.json) to connection string to your database. Then run `update-database` to apply all of the migrations to the database.
- Nuget Packages should be downloaded automaticly when opening visual studio

### NugetPackages
nuget packagelist below in case something goes wrong when opening project.
```
<PackageReference Include="Microsoft.AspNetCore.Mvc.NewtonsoftJson" Version="7.0.13" />
<PackageReference Include="Microsoft.AspNetCore.OpenApi" Version="7.0.10" />
<PackageReference Include="Serilog" Version="3.1.1" />
<PackageReference Include="Serilog.AspNetCore" Version="8.0.0" />
<PackageReference Include="Serilog.Sinks.Console" Version="5.0.0" />
<PackageReference Include="Serilog.Sinks.File" Version="5.0.0" />
<PackageReference Include="Swashbuckle.AspNetCore" Version="6.5.0" />
<PackageReference Include="Microsoft.EntityFrameworkCore.Design" Version="7.0.12">
```


## **Frontend**
Most of the core code in react is found in homepage.js, majority of the states and everything that is imported and used for the basic functions to work is seen in homepage.js
and from there you can navigate yourself throught the components to see what they do/change how they work. Settingspage and excludedpage are seperated files with their own css
if you want to make any changes to those 2 as well.
Every component is divided into their own file to easier keep track of where it is. The api calls and sorting function are found in the "Helpers" folder.

### React component overview
```mermaid
flowchart TD;
  Home[Homepage]
  Table[Table]
  Search[SearchAndFilters]
  Desc[Description]
  Head[Header]
  Layout[Layout]
  Settings[Settings]
  Excluded[Excluded]


  Layout --> Head
  Head --> Home  & Settings & Excluded
  Home --> Table & Search & Desc
```

## **Backend**
In the service folder you'll find all our getters and parsers. What hits we're returning from the API, how we parse the text to store certain information and handle the tags that
are added to a job. Outside of this we have all our entities in a entity folder and you can find the controller in the controller folder.

### **Implementing new data sources**
1. Add a class for the new data getter in `Infrastructure\Services` that implements `IDataGetter`.
2. Add a new constructor for `Domain\Entities\JobScoutJob.cs` that converts the data from the new getter to the standardised format.
3. Add your new getter to the readonly array named `Getters` at the top of `Infrastructure\Services\DataGetter.cs` file.

### **Data source flowshart**

```mermaid
flowchart TD;
  Api[Controller]
  GetApiCall[run_data_gathering]
  C[GetDataFromAllProviders]
  D[GetData]
  Provider1[PlatsbankenGetterService]
  Provider2[another getterService]
  DB[(DataBase)]

  Api --> GetApiCall;
  GetApiCall --> C;
  C --> D;

  D <-- JobScoutContext --> DB

  D -- "IDataGetter" --> Provider1 & Provider2
```

## **Contributor**
[112axel](https://github.com/112axel),
[Vellethe](https://github.com/Vellethe)


## **License**
[Link to License](./License.txt)
