import PDFParser from "pdf2json";
import fs from "fs";

const pdfParser = new PDFParser();

pdfParser.on("pdfParser_dataError", (err) => console.error(err.parserError));

pdfParser.on("pdfParser_dataReady", (pdfData) => {
  const result = {};
  let fieldCounter = 1;

  pdfData.Pages.forEach((page) => {
    const rows = {};

    page.Texts.forEach((text) => {
      const y = text.y.toFixed(1);
      const value = decodeURIComponent(text.R[0].T).trim();

      if (!rows[y]) rows[y] = [];
      rows[y].push(value);
    });

    Object.values(rows).forEach((row) => {
      const combinedText = row.join(" ").trim();

      if (combinedText) {
        result[`field_${fieldCounter}`] = combinedText;
        fieldCounter++;
      }
    });
  });

  fs.writeFileSync("output.json", JSON.stringify(result, null, 2));

  console.log("✅ field-based JSON generated");
});

pdfParser.loadPDF("sample.pdf");
