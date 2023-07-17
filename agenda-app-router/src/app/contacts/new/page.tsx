import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { NewContactForm } from "@/components/forms/new-contact-form"
import { Shell } from "@/components/shells/shell"

export default function NewContact() {
  return (
    <Shell>
      <Card>
        <CardHeader>
          <CardTitle>Novo Contato</CardTitle>
        </CardHeader>
        <CardContent>
          <NewContactForm />
        </CardContent>
      </Card>
    </Shell>
  )
}
