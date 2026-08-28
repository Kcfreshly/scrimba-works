import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

export async function getDBConnection() {

const dbPath = path.join(path.dirname(fileURLToPath(import.meta.url)), 'database.db')

 return open({
   filename: dbPath,
   driver: sqlite3.Database
 }) 

} 
