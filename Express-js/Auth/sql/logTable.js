import { getDBConnection } from "../db/db.js";

export async function logTable() {
    const db = await getDBConnection();

    const tableName  = 'users';

    try {
        const table = await db.all(`SELECT * from ${tableName};`)
        console.log(table)
    } catch (error) {
        console.error(error)
    } finally {
        await db.close()
    }
}

async function viewAllProducts() {
  const db = await getDBConnection();

  try { 
    const products = await db.all('SELECT * FROM products')
    // Neater table display
    const displayItems = products.map(({ id, title, artist, year, stock }) => {
      return { id, title, artist, year, stock }
    })
    console.table(displayItems)
  } catch (err) {
    console.error('Error fetching products:', err.message)
  } finally {
    await db.close()
  }
}

async function viewCartItems() {
  const db = await getDBConnection();

  try {
    const cartItems = await db.all('SELECT * FROM cart')
    console.table(cartItems)
  } catch (err) {
    console.error('Error fetching cart items:', err.message)
  } finally {
    await db.close()
  }
}

// Call the functions to view products and cart items
//viewAllProducts()
viewCartItems()

//logTable()