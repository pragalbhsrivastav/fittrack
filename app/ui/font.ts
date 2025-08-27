import { Anek_Latin, Cedarville_Cursive, Inter } from "next/font/google";

export const Latin =  Inter({})

export const anekLatin = Anek_Latin({
  weight: ['400'],
  subsets: ['latin'], // yeh zaroori hota hai
  variable: '--font-anek-latin', // yahan custom CSS variable define hota hai
});