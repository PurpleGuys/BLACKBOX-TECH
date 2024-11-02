import { DrinkHistory } from '@/lib/types';
import * as XLSX from 'xlsx';

export const exportToExcel = (history: DrinkHistory[]) => {
  const worksheet = XLSX.utils.json_to_sheet(
    history.map(item => ({
      Date: new Date(item.timestamp).toLocaleString(),
      Boisson: item.drinkName,
      Prix: `${item.price}€`,
      Quantité: item.quantity
    }))
  );

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Historique des ventes");

  XLSX.writeFile(workbook, "historique_ventes.xlsx");
};