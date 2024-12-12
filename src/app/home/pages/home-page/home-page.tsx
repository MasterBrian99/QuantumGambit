import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Clock,
  Copy,
  Import,
  RefreshCcw
} from 'lucide-react'
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
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Chess, ChessInstance, Piece, Square } from 'chess.js'
import { useState } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
const HomePage = () => {
  type CurrentGameType = {
    fen: string
    game: ChessInstance
    currentMovePosition: number
    pgn: string
    history: string[]
  }
  const [currentGame, setcurrentGame] = useState<CurrentGameType>({
    fen: '',
    currentMovePosition: 0,
    game: new Chess(),
    pgn: '',
    history: []
  })
  // const [currentGameHistory, setcurrentGameHistory] = useState<string[]>([])
  const [inputPgn, setInputPgn] = useState('')
  function setPgn() {
    const fromPgn = new Chess()
    fromPgn.load_pgn(inputPgn)
    setcurrentGame({
      fen: fromPgn.fen(),
      currentMovePosition: fromPgn.history().length,
      game: fromPgn,
      pgn: inputPgn,
      history: fromPgn.history()
    })
    // setcurrentGameHistory(fromPgn.history())
  }

  function goForwardAndBackward(
    type: 'forward' | 'backward' | 'reset' | 'start' | 'end'
  ) {
    const newGameInstance = { ...currentGame }
    if (currentGame.history.length > 0) {
      if (type === 'forward') {
        if (
          newGameInstance.game.move(
            currentGame.history[currentGame.currentMovePosition]
          )
        ) {
          const fen = newGameInstance.game.fen()
          setcurrentGame({
            ...currentGame,
            fen,
            currentMovePosition: currentGame.currentMovePosition + 1,
            game: newGameInstance.game
          })
        }
      }
      if (type === 'backward') {
        if (newGameInstance.game.undo()) {
          const fen = newGameInstance.game.fen()
          setcurrentGame({
            ...currentGame,
            fen,
            currentMovePosition: currentGame.currentMovePosition - 1,
            game: newGameInstance.game
          })
        }
      }
      if (type === 'reset' || type === 'end') {
        const fromPgn = new Chess()
        fromPgn.load_pgn(currentGame.pgn)
        setcurrentGame({
          fen: fromPgn.fen(),
          currentMovePosition: fromPgn.history().length,
          game: fromPgn,
          pgn: inputPgn,
          history: fromPgn.history()
        })
      }
      if (type === 'start') {
        const newGame = new Chess()
        setcurrentGame({
          fen: newGame.fen(),
          currentMovePosition: 0,
          game: newGame,
          pgn: inputPgn,
          history: currentGame.history
        })
      }
    }
  }
  function onDrop(_sourceSquare: Square, _targetSquare: Square) {
    return false
  }
  return (
    <div>
      <div className="grid grid-cols-12 grid-rows-1 gap-3">
        <div className="col-span-4">
          <div className="flex flex-col">
            <Chessboard
              onPieceDrop={onDrop}
              position={currentGame.game.fen()}
              id="BasicBoard"
            />
            <div className="mt-2 flex justify-between gap-2">
              <div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="default" size="icon">
                      <Import />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Import a game</DialogTitle>
                      <DialogDescription>
                        Anyone who has this link will be able to view this.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center space-x-2">
                      <div className="grid flex-1 gap-2">
                        <Label htmlFor="link" className="sr-only">
                          Link
                        </Label>
                        <Textarea
                          onChange={(e) => setInputPgn(e.target.value)}
                          value={inputPgn}
                          rows={10}
                          id="pgn"
                        />
                      </div>
                    </div>
                    <DialogFooter className="sm:justify-end">
                      <DialogClose asChild>
                        <Button
                          onClick={() => setPgn()}
                          type="button"
                          variant="secondary"
                        >
                          Import
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="gap-2 flex">
                <Button
                  onClick={() => goForwardAndBackward('start')}
                  variant="default"
                  size="icon"
                >
                  <ChevronsLeft />
                </Button>
                <Button
                  onClick={() => goForwardAndBackward('backward')}
                  variant="default"
                  size="icon"
                >
                  <ChevronLeft />
                </Button>
                <Button
                  variant="default"
                  size="icon"
                  onClick={() => goForwardAndBackward('reset')}
                >
                  <RefreshCcw />
                </Button>
                <Button
                  onClick={() => goForwardAndBackward('forward')}
                  variant="default"
                  size="icon"
                >
                  <ChevronRight />
                </Button>
                <Button variant="default" size="icon">
                  <ChevronsRight />
                </Button>
              </div>
            </div>
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
