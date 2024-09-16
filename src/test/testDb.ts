import { db } from "@/db";
import { spendingTable } from "@/db/schema";
import { eq } from "drizzle-orm";

(async () => {
    const a= await db.select().from(spendingTable).where(eq(spendingTable.id,1))
    console.log(a)
})();
