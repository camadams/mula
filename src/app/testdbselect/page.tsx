import { db } from "@/db"
import { spendingTable } from "@/db/schema"
export default async function testdbselect() {
    const data = await db.select().from(spendingTable)
    return (<div>{JSON.stringify(data)}</div>)
}