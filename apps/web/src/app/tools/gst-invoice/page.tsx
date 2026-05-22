import { permanentRedirect } from 'next/navigation';

export default function LegacyGSTInvoiceRoute() {
  permanentRedirect('/gst-invoice');
}
