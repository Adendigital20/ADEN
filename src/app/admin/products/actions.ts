"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import fs from "node:fs";
import path from "node:path";

export async function addProduct(formData: FormData) {
  try {
    const nom = formData.get("nom") as string;
    const description = formData.get("description") as string;
    const prix = parseFloat(formData.get("prix") as string);
    const stock = parseInt(formData.get("stock") as string, 10);
    
    const file = formData.get("image") as File | null;
    let image = null;

    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const uploadDir = path.join(process.cwd(), "public/uploads");
      
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const ext = path.extname(file.name) || ".jpg";
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const filename = uniqueSuffix + ext;
      const filepath = path.join(uploadDir, filename);
      
      fs.writeFileSync(filepath, buffer);
      image = `/uploads/${filename}`;
    }

    if (!image) {
      throw new Error("L'image est obligatoire");
    }

    await prisma.product.create({
      data: {
        nom,
        description: description || null,
        prix: isNaN(prix) ? 0 : prix,
        image,
        stock: isNaN(stock) ? 0 : stock,
      }
    });

    revalidatePath("/admin/products");
    revalidatePath("/boutique");
    
    return { success: true };
  } catch (error: any) {
    console.error("Erreur ajout produit:", error);
    return { success: false, error: error.message || "Erreur serveur" };
  }
}

export async function deleteProduct(id: string) {
  try {
    await prisma.product.delete({
      where: { id }
    });
    revalidatePath("/admin/products");
    revalidatePath("/boutique");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
