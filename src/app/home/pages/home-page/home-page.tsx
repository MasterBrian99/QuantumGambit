import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Clock } from 'lucide-react'
import { Chessboard } from 'react-chessboard'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { ScrollArea } from '@/components/ui/scroll-area'

const HomePage = () => {
  return (
    <div>
      <div className="grid grid-cols-12 grid-rows-1 gap-3">
        <div className="col-span-4">
          <div>
            <Chessboard id="BasicBoard" />
          </div>
        </div>
        <div className="col-span-3 ">
          <Card>
            <CardContent className="p-2 ">
              <div className=" grid grid-cols-2 grid-rows-1  justify-items-stretch">
                <div className="col-span-1 grid grid-cols-1 grid-rows-1">
                  <div className="grid grid-cols-12 grid-rows-1 h-20 gap-1 ">
                    <div className="col-span-3 flex justify-center items-center">
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="col-span-9 grid grid-cols-1 grid-rows-2 gap-1  ">
                      <div className="border p-2 flex justify-between items-center rounded-lg bg-secondary">
                        <Clock />
                        <div className="font-bold text-2xl">07.22</div>
                      </div>
                      <div className="border p-2 flex justify-between items-center">
                        <Clock />
                        <div className="font-bold text-2xl">07.22</div>
                      </div>
                    </div>
                  </div>
                  <div>asd</div>
                </div>
                <div className="col-span-1 grid grid-cols-1 grid-rows-1">
                  <div className="grid grid-cols-12 grid-rows-1 h-20 gap-1 ">
                    <div className="col-span-3 flex justify-center items-center">
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="col-span-9 grid grid-cols-1 grid-rows-2 gap-1  ">
                      <div className="border p-2 flex justify-between items-center rounded-lg bg-secondary">
                        <Clock />
                        <div className="font-bold text-2xl">07.22</div>
                      </div>
                      <div className="border p-2 flex justify-between items-center">
                        <Clock />
                        <div className="font-bold text-2xl">07.22</div>
                      </div>
                    </div>
                  </div>
                  <h2 className="text-end">asd</h2>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="mt-2">
            <Tabs defaultValue="moves">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="moves">Moves</TabsTrigger>
                <TabsTrigger value="info">Info</TabsTrigger>
              </TabsList>
              <TabsContent value="moves">
                <Card>
                  <CardHeader>
                    <CardDescription>
                      Van Geet Opening: Reversed Nimzowitsch Variation
                    </CardDescription>
                    <Separator />
                  </CardHeader>
                  <CardContent className="h-full">
                    <ScrollArea className="h-[280px]  w-full rounded-md ">
                      <Table>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">1.</TableCell>
                            <TableCell className="text-center">e3</TableCell>
                            <TableCell className="text-right">e5</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">1.</TableCell>
                            <TableCell className="text-center">e3</TableCell>
                            <TableCell className="text-right">e5</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">1.</TableCell>
                            <TableCell className="text-center">e3</TableCell>
                            <TableCell className="text-right">e5</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">1.</TableCell>
                            <TableCell className="text-center">e3</TableCell>
                            <TableCell className="text-right">e5</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">1.</TableCell>
                            <TableCell className="text-center">e3</TableCell>
                            <TableCell className="text-right">e5</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">1.</TableCell>
                            <TableCell className="text-center">e3</TableCell>
                            <TableCell className="text-right">e5</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">1.</TableCell>
                            <TableCell className="text-center">e3</TableCell>
                            <TableCell className="text-right">e5</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">1.</TableCell>
                            <TableCell className="text-center">e3</TableCell>
                            <TableCell className="text-right">e5</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">1.</TableCell>
                            <TableCell className="text-center">e3</TableCell>
                            <TableCell className="text-right">e5</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">1.</TableCell>
                            <TableCell className="text-center">e3</TableCell>
                            <TableCell className="text-right">e5</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">1.</TableCell>
                            <TableCell className="text-center">e3</TableCell>
                            <TableCell className="text-right">e5</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">1.</TableCell>
                            <TableCell className="text-center">e3</TableCell>
                            <TableCell className="text-right">e5</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">1.</TableCell>
                            <TableCell className="text-center">e3</TableCell>
                            <TableCell className="text-right">e5</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="info">
                <Card>
                  <CardHeader>
                    <CardTitle>Password</CardTitle>
                    <CardDescription>
                      Change your password here. After saving, you'll be logged
                      out.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">aaa</CardContent>
                  <CardFooter>
                    <Button>Save password</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div className="col-span-4 bg-teal-800">3</div>
      </div>
    </div>
  )
}

export default HomePage

{
  /* <div className="flex flex-1 flex-col gap-4 p-4">
<div className="grid auto-rows-min gap-4 md:grid-cols-3">
  <div className="aspect-video rounded-xl bg-muted/50" />
  <div className="aspect-video rounded-xl bg-muted/50" />
  <div className="aspect-video rounded-xl bg-muted/50" />
</div>
<div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
</div>
<main className="w-full container mx-auto">
<h1 className="text-3xl font-bold">Welcome to Tauri + React</h1>

<p>Click on thasde Tauri, Vite, and React logos to learn more.</p>

<Button
  onClick={() => {
    greet()
  }}
  type="submit"
  variant={'destructive'}
>
  Gasdreet
</Button>
<p>{greetMsg}</p>
</main> */
}
