import { SiteHeader } from "@/components/site-header"
import { useRoutes } from "react-router-dom"
import { TailwindIndicator } from "./components/tailwind-indicator"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const startups = [
  {
    name: "QuantumFin",
    description: "Pioneering quantum-inspired financial solutions",
    industry: "Fintech",
    amount: "$90K",
  },
  {
    name: "MediNova",
    description: "Redefining healthcare with advanced tech innovations",
    industry: "HealthTech",
    amount: "$50K",
  },
  {
    name: "GreenEco",
    description: "Leading the way in eco-friendly technology development",
    industry: "EcoTech",
    amount: "$10K",
  },
  {
    name: "InnoSolution",
    description: "Providing cutting-edge solutions for modern challenges",
    industry: "security",
    amount: "$100K ",
  },
]

function Home() {
  return (
    <section className="container flex items-center pb-8 pt-6 md:py-10">
      <div className="flex flex-col gap-3">
        <div>
          <Dialog>
            <DialogTrigger>
              <Button variant="default" className="bg-sky-300 hover:bg-sky-500">
                Depositar
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Cuanto quieres depositar</DialogTitle>
                <DialogDescription>
                  <div className="my-3">
                    <Label htmlFor="amount" className="my-2 text-right">
                      Cantidad
                    </Label>
                    <Input id="amount" value={0.0} className="col-span-3" />
                  </div>

                  <Button variant="default" className="bg-sky-300 hover:bg-sky-500">
                    Confirmar
                  </Button>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex flex-wrap items-start gap-3">
          {startups.map((startup, index) => (
            <Card key={index} className="w-[250px]">
              <CardHeader>
                <CardTitle>{startup.name}</CardTitle>
                <CardDescription>
                  {startup.description}
                  <p className="my-1 font-bold">
                    Amount Raising: {startup.amount}
                  </p>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="outline">{startup.industry}</Badge>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Dialog>
                  <DialogTrigger>
                    <Button variant="default" className="bg-primary">
                      Invertir
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Cuanto quieres invertir?</DialogTitle>
                      <DialogDescription>
                        <div className="my-3">
                          <Label htmlFor="amount" className="my-2 text-right">
                            Cantidad
                          </Label>
                          <Input
                            id="amount"
                            value={0.0}
                            className="col-span-3"
                          />
                        </div>

                        <Button variant="default" className="bg-primary">
                          Confirmar
                        </Button>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

const routes = [{ path: "/", element: <Home /> }]

function App() {
  const children = useRoutes(routes)

  return (
    <>
      <div className="relative flex min-h-screen flex-col ">
        <SiteHeader />
        <div className="flex-1">{children}</div>
      </div>
      <TailwindIndicator />
    </>
  )
}

export default App
