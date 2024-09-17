'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { StarIcon, ShoppingCartIcon, HeartIcon, TruckIcon, ShieldCheckIcon, ArrowLeftIcon, CheckCircleIcon, BatteryChargingIcon, CpuIcon, MonitorIcon, HardDriveIcon, MinusIcon, PlusIcon } from 'lucide-react'

// Dies würde normalerweise von einer API oder Datenbank kommen
const produkt = {
  id: 1,
  name: "Generalüberholter Premium-Laptop",
  preis: 699.99,
  kategorie: "Laptops",
  bewertung: 4.7,
  beschreibung: "Leistungsstarker, generalüberholter Laptop in hervorragendem Zustand. Ideal für anspruchsvolle Büroarbeit, kreative Projekte und moderates Gaming. Mit seiner Kombination aus Leistung, Qualität und Nachhaltigkeit ist er die perfekte Wahl für umweltbewusste Technikliebhaber.",
  spezifikationen: {
    prozessor: "Intel Core i7-10750H (6 Kerne, bis zu 5,0 GHz)",
    arbeitsspeicher: "16GB DDR4-2933MHz (erweiterbar auf 32GB)",
    speicher: "512GB NVMe SSD",
    bildschirm: "15,6 Zoll Full HD IPS-Display (1920x1080, 100% sRGB)",
    grafik: "NVIDIA GeForce GTX 1650 Ti mit 4GB GDDR6",
    betriebssystem: "Windows 10 Pro (Upgrade auf Windows 11 möglich)",
    akku: "4-Zellen Lithium-Ionen-Akku (68Wh)",
    anschlüsse: "2x USB 3.2 Gen 1, 1x USB-C 3.2 Gen 2 (mit DisplayPort und Power Delivery), HDMI, Ethernet, Audio-Kombi-Buchse",
    kamera: "HD-Webcam mit Privatsphäre-Verschluss",
    audio: "Stereo-Lautsprecher mit Dolby Audio",
    gewicht: "1,9 kg",
    farbe: "Mattschwarzes Aluminiumgehäuse"
  },
  zustand: "Exzellent",
  garantie: "24 Monate",
  bilder: [
    "/placeholder.svg?height=400&width=600&text=Laptop+Frontansicht",
    "/placeholder.svg?height=400&width=600&text=Laptop+Seitenansicht",
    "/placeholder.svg?height=400&width=600&text=Laptop+Rückansicht",
    "/placeholder.svg?height=400&width=600&text=Laptop+Tastatur",
  ],
  highlights: [
    "Leistungsstarker Intel Core i7 Prozessor der 10. Generation",
    "Dedizierte NVIDIA GeForce GTX 1650 Ti Grafikkarte",
    "Hochauflösendes Full HD IPS-Display mit 100% sRGB-Farbraumabdeckung",
    "Schnelle 512GB NVMe SSD für kurze Ladezeiten",
    "Umfangreiche Anschlussmöglichkeiten inklusive USB-C mit DisplayPort und Power Delivery"
  ],
  nachhaltigkeitsaspekte: [
    "Reduzierung von Elektroschrott durch Wiederverwendung",
    "Energieeffizientes Modell mit ENERGY STAR Zertifizierung",
    "Verpackung aus recycelten Materialien",
    "Kostenlose Rücknahme des Altgeräts beim Kauf"
  ]
}

export default function ProduktDetail() {
  const [hauptBild, setHauptBild] = useState(produkt.bilder[0])
  const [menge, setMenge] = useState(1)
  const [istFavorit, setIstFavorit] = useState(false)
  const router = useRouter()

  const handleMengeÄndern = useCallback((änderung: number) => {
    setMenge((vorherigeMenge) => Math.max(1, vorherigeMenge + änderung))
  }, [])

  const handleZumWarenkorbHinzufügen = useCallback(() => {
    console.log(`${menge} ${produkt.name} zum Warenkorb hinzugefügt`)
  }, [menge])

  const handleJetztKaufen = useCallback(() => {
    console.log(`Kaufe jetzt ${menge} ${produkt.name}`)
  }, [menge])

  return (
    <div className="container mx-auto px-4 py-8">
      <Button 
        variant="ghost" 
        className="mb-4"
        onClick={() => router.back()}
      >
        <ArrowLeftIcon className="mr-2 h-4 w-4" /> Zurück
      </Button>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="mb-4 relative h-[400px]">
            <Image 
              src={hauptBild} 
              alt={produkt.name}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {produkt.bilder.map((bild, index) => (
              <div 
                key={index} 
                className={`relative h-24 cursor-pointer border-2 rounded-md overflow-hidden ${bild === hauptBild ? 'border-blue-500' : 'border-transparent'}`}
                onClick={() => setHauptBild(bild)}
              >
                <Image 
                  src={bild} 
                  alt={`${produkt.name} Ansicht ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-2">{produkt.name}</h1>
          <div className="flex items-center mb-4">
            <div className="flex mr-2">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className={`w-5 h-5 ${i < Math.floor(produkt.bewertung) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
              ))}
            </div>
            <span className="text-sm text-gray-600">{produkt.bewertung} von 5 Sternen</span>
          </div>
          <Badge variant="secondary" className="mb-4">{produkt.kategorie}</Badge>
          <p className="text-3xl font-bold text-green-600 mb-4">{produkt.preis.toFixed(2)} €</p>
          <p className="mb-6 text-gray-700">{produkt.beschreibung}</p>
          
          <div className="flex items-center space-x-4 mb-6">
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => handleMengeÄndern(-1)}
              disabled={menge <= 1}
            >
              <MinusIcon className="h-4 w-4" />
            </Button>
            <span className="text-xl font-semibold">{menge}</span>
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => handleMengeÄndern(1)}
            >
              <PlusIcon className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex space-x-4 mb-6">
            <Button className="flex-1 bg-blue-600 hover:bg-blue-700" onClick={handleZumWarenkorbHinzufügen}>
              <ShoppingCartIcon className="mr-2 h-4 w-4" /> In den Warenkorb
            </Button>
            <Button className="flex-1" variant="secondary" onClick={handleJetztKaufen}>
              Jetzt kaufen
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => setIstFavorit(!istFavorit)}
              className={istFavorit ? 'bg-red-100' : ''}
            >
              <HeartIcon className={`h-4 w-4 ${istFavorit ? 'text-red-500 fill-current' : ''}`} />
            </Button>
          </div>

          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex items-center mb-2">
                <TruckIcon className="mr-2 h-4 w-4 text-green-500" />
                <span>Kostenloser Versand</span>
              </div>
              <div className="flex items-center">
                <ShieldCheckIcon className="mr-2 h-4 w-4 text-blue-500" />
                <span>{produkt.garantie} Garantie</span>
              </div>
            </CardContent>
          </Card>

          <Accordion type="single" collapsible className="mb-6">
            <AccordionItem value="highlights">
              <AccordionTrigger>Produkt-Highlights</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-5 space-y-2">
                  {produkt.highlights.map((highlight, index) => (
                    <li key={index} className="text-gray-700">
                      <CheckCircleIcon className="inline-block mr-2 h-4 w-4 text-green-500" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Tabs defaultValue="spezifikationen">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="spezifikationen">Spezifikationen</TabsTrigger>
              <TabsTrigger value="zustand">Zustand</TabsTrigger>
              <TabsTrigger value="garantie">Garantie</TabsTrigger>
            </TabsList>
            <TabsContent value="spezifikationen">
              <Card>
                <CardContent className="p-4">
                  <ul className="space-y-2">
                    {Object.entries(produkt.spezifikationen).map(([key, value]) => (
                      <li key={key} className="flex items-start">
                        <span className="font-semibold mr-2 min-w-[120px]">{key}:</span>
                        <span>{value}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="zustand">
              <Card>
                <CardContent className="p-4">
                  <p className="font-semibold mb-2">Zustand: {produkt.zustand}</p>
                  <p className="text-gray-700">Alle unsere generalüberholten Geräte durchlaufen einen strengen Qualitätssicherungsprozess:</p>
                  <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
                    <li>Gründliche Reinigung und Desinfektion</li>
                    <li>Vollständige Funktionsprüfung aller Komponenten</li>
                    <li>Austausch defekter oder abgenutzter Teile</li>
                    <li>Aktualisierung der Software und Treiber</li>
                    <li>Abschließender Leistungstest</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="garantie">
              <Card>
                <CardContent className="p-4">
                  <p className="font-semibold mb-2">Garantie: {produkt.garantie}</p>
                  <p className="text-gray-700">Unsere umfassende Garantie bietet Ihnen Sicherheit und Schutz:</p>
                  <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
                    <li>24 Monate Garantie auf alle Hardware-Komponenten</li>
                    <li>Kostenloser technischer Support</li>
                    <li>30 Tage Rückgaberecht ohne Angabe von Gründen</li>
                    <li>Schneller Reparatur- oder Austauschservice</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-green-600 flex items-center">
                <BatteryChargingIcon className="mr-2 h-5 w-5" />
                Nachhaltigkeitsaspekte
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {produkt.nachhaltigkeitsaspekte.map((aspekt, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <CheckCircleIcon className="mr-2 h-4 w-4 text-green-500" />
                    {aspekt}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Technische Details</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CpuIcon className="mr-2 h-5 w-5" />
                Leistung
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-2"><span className="font-semibold">Prozessor:</span> {produkt.spezifikationen.prozessor}</p>
              <p className="mb-2"><span className="font-semibold">Arbeitsspeicher:</span> {produkt.spezifikationen.arbeitsspeicher}</p>
              <p><span className="font-semibold">Grafik:</span> {produkt.spezifikationen.grafik}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MonitorIcon className="mr-2 h-5 w-5" />
                Display
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>{produkt.spezifikationen.bildschirm}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <HardDriveIcon className="mr-2 h-5 w-5" />
                Speicher
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>{produkt.spezifikationen.speicher}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ShieldCheckIcon className="mr-2 h-5 w-5" />
                Software
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>{produkt.spezifikationen.betriebssystem}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
