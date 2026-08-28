import { getDBConnection } from '../db/db.js'



async function createTable() { 
    const db = await getDBConnection()
        await db.exec(`
            CREATE TABLE users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT UNIQUE NOT NULL,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            );
        `)

        await db.close()
        console.log('table created')
}

export async function createTableProducts() {
    const db = await getDBConnection()
    await db.exec(`
        CREATE TABLE IF NOT EXISTS products (
                id INTEGER PRIMARY KEY AUTOINCREMENT, 
                title TEXT NOT NULL, 
                artist TEXT NOT NULL,
                price REAL NOT NULL,
                image TEXT NOT NULL,
                year INTEGER,
                genre TEXT,
                stock INTEGER 
        )
    
    `)

    await db.close()
    console.log('table created')
}

export async function createCartTable() {
    const db = await getDBConnection()
    await db.exec(`
        CREATE TABLE IF NOT EXISTS cart (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            product_id INTEGER NOT NULL,
            quantity INTEGER NOT NULL DEFAULT 1,
            FOREIGN KEY (user_id) REFERENCES users(id),
            FOREIGN KEY (product_id) REFERENCES products(id)
        )
    `)
    await db.close()
    console.log('table created')
}


//createTable()
//createTableProducts()
createCartTable()
