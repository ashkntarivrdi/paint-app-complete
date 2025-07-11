# مستندات تمرین نقاشی بکش لویی

## توضیحات کلی برنامه
این برنامه یک پلتفرم طراحی آنلاین است که به کاربران اجازه می‌دهد اشکال مختلفی مانند دایره، مربع و مثلث را بر روی یک بوم طراحی کنند. کاربران می‌توانند طراحی‌های خود را ذخیره کنند، بارگذاری کنند و همچنین طراحی‌ها را به صورت فایل JSON صادر یا وارد کنند. هر کاربر تنها می‌تواند یک طراحی ذخیره کند و طراحی جدید جایگزین طراحی قبلی خواهد شد.

---

## قابلیت‌های برنامه
1. **ایجاد اشکال**: کاربران می‌توانند اشکال مختلفی را از نوار کناری انتخاب کرده و بر روی بوم طراحی قرار دهند.
2. **ویرایش اشکال**: امکان تغییر اندازه و جابجایی اشکال بر روی بوم وجود دارد.
3. **ذخیره طراحی**: طراحی‌ها در پایگاه داده SQLite ذخیره می‌شوند و پس از بارگذاری مجدد برنامه قابل دسترسی هستند.
4. **بارگذاری طراحی**: کاربران می‌توانند طراحی ذخیره‌شده خود را بارگذاری کنند.
5. **صادر کردن و وارد کردن طراحی**: طراحی‌ها به صورت فایل JSON صادر و وارد می‌شوند.
6. **نمایش نام کاربر**: نام کاربر فعلی در بالای صفحه نمایش داده می‌شود.

---

## ساختار کد
### فایل‌های اصلی:
1. **`backend/server.js`**:
   - سرور اصلی برنامه که با استفاده از Express ساخته شده است.
   - شامل API‌هایی برای ذخیره و بارگذاری طراحی‌ها و همچنین احراز هویت کاربران.
   - پایگاه داده SQLite برای ذخیره طراحی‌ها استفاده شده است.

2. **`backend/src/db/setup.js`**:
   - فایل تنظیمات پایگاه داده SQLite.
   - جدول طراحی‌ها ایجاد می‌شود و اتصال به پایگاه داده برقرار می‌شود.

3. **`src/App.js`**:
   - کامپوننت اصلی React که ساختار کلی برنامه را مدیریت می‌کند.
   - شامل کامپوننت‌های Header، Sidebar، Canvas و ShapeCounter.

4. **`src/components/Header.js`**:
   - کامپوننت بالای صفحه که شامل نام کاربر، ورودی عنوان طراحی و دکمه‌های ذخیره، بارگذاری، صادر کردن و وارد کردن است.

5. **`src/components/Sidebar.js`**:
   - نوار کناری که اشکال قابل انتخاب را نمایش می‌دهد.

6. **`src/components/Canvas.js`**:
   - بوم طراحی که کاربران می‌توانند اشکال را بر روی آن قرار دهند، جابجا کنند یا اندازه آن‌ها را تغییر دهند.

7. **`src/components/ShapeCounter.js`**:
   - شمارنده اشکال که تعداد هر نوع شکل موجود در طراحی را نمایش می‌دهد.

8. **`src/styles.css`**:
   - فایل استایل برنامه که ظاهر کلی و چیدمان عناصر را مدیریت می‌کند.

---

## نحوه اجرای برنامه

1. ابتدا مخزن را کلون کنید:
    ```bash
    git clone https://github.com/ashkntarivrdi/paint-app-complete
    ```
2. وارد پوشه پروژه شوید:
    ```bash
    cd paint-app-complete
    ```
3. ابتدا وابستگی‌های مورد نیاز را نصب کنید:
   ```bash
   npm install
   ```
4. سرور را اجرا کنید:
    ```bash
    node backend/server.js
    ```
5. برنامه React را اجرا کنید:
    ```bash
    npm start
    ```
6. برنامه در مرورگر در آدرس زیر قابل دسترسی است:
    ```bash
    http://localhost:3000
    ```

---
## وابستگی‌ها

### بک‌اند:
- **express**: برای ساخت سرور HTTP و مدیریت درخواست‌ها.
- **body-parser**: برای پردازش داده‌های ورودی به صورت JSON.
- **cors**: برای مدیریت درخواست‌های Cross-Origin در زمان توسعه.
- **sqlite3**: برای مدیریت پایگاه داده SQLite و ذخیره‌سازی طراحی‌ها.

### فرانت‌اند:
- **react**: برای ساخت رابط کاربری و مدیریت کامپوننت‌ها.
- **react-dom**: برای رندر کردن کامپوننت‌های React در DOM.
- **react-dnd**: برای پیاده‌سازی قابلیت Drag & Drop در بوم طراحی.
- **react-dnd-html5-backend**: برای مدیریت Drag & Drop با استفاده از HTML5.
- **CSS**: برای طراحی و استایل‌دهی رابط کاربری.

---

## نکات مهم

- **ذخیره‌سازی طراحی‌ها**:
  طراحی‌ها در پایگاه داده SQLite ذخیره می‌شوند و پس از بارگذاری مجدد سرور از دست نمی‌روند.

- **فایل‌های JSON**:
  طراحی‌ها می‌توانند به صورت فایل JSON صادر یا وارد شوند که شامل اطلاعات اشکال و موقعیت آن‌ها روی بوم است.

- **واکنش‌گرایی**:
  برنامه به صورت واکنش‌گرا طراحی شده و در دستگاه‌های مختلف به درستی نمایش داده می‌شود.

- **احراز هویت ساده**:
  در حال حاضر احراز هویت به صورت سخت‌کد شده است و همیشه کاربر `user1` انتخاب می‌شود. برای توسعه بیشتر، می‌توان سیستم ورود و خروج کاربران را اضافه کرد.

- **ساختار ماژولار**:
  کد به صورت ماژولار نوشته شده است و هر کامپوننت وظیفه مشخصی دارد.

---

## توسعه‌دهنده

این پروژه توسط اشکان تاریوردی توسعه داده شده است. اگر سوال یا پیشنهادی دارید، می‌توانید از طریق مخزن گیت‌هاب با من در ارتباط باشید.
