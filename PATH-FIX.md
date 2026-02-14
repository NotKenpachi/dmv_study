# Fix "npm is not recognized" on Windows

Node is installed at **`C:\Program Files\nodejs`**, but that folder is not in your PATH. Do one of the following.

## Option 1: Add Node to PATH (recommended)

1. Press **Win + S**, type **environment variables**, open **Edit the system environment variables**.
2. Click **Environment Variables**.
3. Under **User variables**, select **Path** → **Edit**.
4. Click **New** and add:  
   `C:\Program Files\nodejs`
5. Click **OK** on all dialogs.
6. **Close and reopen** Cursor (or any terminal). Then `npm` should work.

## Option 2: Use a new terminal after install

If you just installed Node, **close Cursor completely and reopen it**. New terminals will then pick up the updated PATH and `npm` should be recognized.

## Option 3: Run npm by full path (one-time)

In PowerShell you can run:
```powershell
& "C:\Program Files\nodejs\npm.cmd" install
& "C:\Program Files\nodejs\npm.cmd" run dev
```

## Run the app

From the project folder:
```bash
npm run dev
```
Then open the URL shown in the terminal (e.g. http://localhost:5173).
