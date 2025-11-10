import "./globals.css";

export const metadata = {
  title: "Banco Kafka JS"
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        {children}
      </body>
    </html>
  );
}
