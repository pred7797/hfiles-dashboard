
---

## 🛠️ Tech Stack

- **Frontend:** [Next.js 14](https://nextjs.org/), [React](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/)
- **Authentication:** [Clerk](https://clerk.com/) (for user management)
- **Backend:** [Supabase](https://supabase.com/) (Postgres DB, Storage, Auth)
- **Deployment:** [Vercel](https://vercel.com/) (free tier)

---

## ✨ Features

- 🔐 **User Authentication** (Sign up, Sign in, Profile) via Clerk
- 📤 **File Upload**: Upload medical documents (Lab Reports, Prescriptions, X-Rays, etc.)
- 🗃️ **File Storage**: Files stored securely in Supabase Storage
- 📝 **File Metadata**: Store file type, name, and user association in Supabase DB
- 🖼️ **Image Previews**: Preview uploaded images
- 🗑️ **Delete Files**: Remove files from both storage and database
- 👤 **User Profile**: View and update user info (name, email, phone, gender)
- 📱 **Responsive UI**: Works great on desktop and mobile

---

## ⚡️ Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/your-username/hfiles-dashboard.git
cd hfiles-dashboard
```

### 2. Setup Supabase (Backend)

- Create a [Supabase](https://supabase.com/) project.
- Create the following tables and storage bucket:

#### Tables

<p align="center">
  <img src="https://oualfy237r.ufs.sh/f/NBKEpf9FnpKGPflMMP4StcQ5M4OXyipmDkjsC1RuEexGWaZ2" alt="DB SS" width="600"/>
</p>

**users**
| Column           | Type        | Description         |
|------------------|-------------|---------------------|
| id               | int8 (PK)   | Auto-increment      |
| user_id          | text        | Clerk user ID       |
| user_first_name  | text        | User's first name   |
| user_last_name   | text        | User's last name    |
| email_id         | text        | User's email        |
| phone_no         | text        | User's phone        |
| gender           | text        | User's gender       |
| created_at       | timestamptz | Auto (default now())|

**user_files**
| Column      | Type        | Description         |
|-------------|-------------|---------------------|
| id          | int8 (PK)   | Auto-increment      |
| file_type   | text        | Type of file        |
| file_url    | text        | Public URL          |
| user_id     | text        | Clerk user ID       |
| created_at  | timestamptz | Auto (default now())|
| file_name   | text        | Name of the file    |

- Create a **storage bucket** named `user-files`.

- Set up RLS (Row Level Security) policies for secure access (see below).

### 3. Setup Frontend

```bash
cd frontend
cp .env.example .env.local
# Fill in your Supabase and Clerk environment variables in .env.local
npm install
npm run dev
```

### 4. Deploy

- Deploy the frontend to [Vercel](https://vercel.com/) (recommended).
- Set your environment variables in the Vercel dashboard.

---

## 🔒 Supabase RLS Policies (Recommended)

**For user_files:**
```sql
-- Allow users to insert/select/update/delete their own files
CREATE POLICY \"User can manage own files\"
ON user_files
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());
```

**For users:**
```sql
-- Allow users to update/select their own profile
CREATE POLICY \"User can manage own profile\"
ON users
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());
```

**For storage (user-files bucket):**
```sql
-- Allow users to upload/delete their own files
CREATE POLICY \"User can manage own storage objects\"
ON storage.objects
FOR ALL
TO authenticated
USING (bucket_id = 'user-files');
```

---

## 📸Live Preview

![HFiles_dashboard_preview (4)](https://github.com/user-attachments/assets/4e2a9e59-c0af-4136-94e3-91abdbc18543)
