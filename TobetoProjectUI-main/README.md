# TobetoProject UI

NET Core, Entity Framework, React ve TypeScript gibi teknolojileri kullanarak tobeto.com'u sıfırdan geliştirdik. Arka uçta, bir nLayered mimarisi kullandık ve yanıt-istek modelini kullandık. Temel varlık nesnelerini oluşturduktan sonra, projenin veritabanını normalizasyon kurallarına dikkat ederek MSSQL ile tasarladık.

## Teknolojiler

- **Backend**
  - .Net Core
  - Entitiy Framework
  - nLayered Mimari
  - MSSQL (Veritabanı)

- **Frontend**
  - React
  - Typescript

## Kurulum

1. Frontend projesini klonlayın: 

2. İlgili klasörüne gidin:
```bash
cd TobetoProject
```
3. Gerekli bağımlılıkları yükleyin:
```bash
npm install
```
4. Veritabanı bağlantısını yapılandırın:
   - `appsettings.json` dosyasını açın ve MSSQL bağlantı dizesini güncelleyin

5. Veritabanı oluşturun ve uygulamayı başlatın:
```bash
dotnet ef database update
dotnet run
```

## Kullanım
Uygulama başladığında, tarayıcınızı açın ve http://localhost:3000/ adresine gidin. Burada, Tobeto.com'un kullanıcı arayüzünü göreceksiniz.

