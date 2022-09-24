type Room = {
  id: string
  uid: string
  name: string
  created_at: string
}

type Fusen = {
  id: string
  content: string
  xcoordinate: number
  ycoordinate: number
  user_id: string
  room_id: string
  created_at: string
}

type Kanban = {
  id: string
  title: string
  xcoordinate: number
  ycoordinate: number
  room_id: string
  created_at: string
}

type Coordinate = {
  xcoordinate: number
  ycoordinate: number
}
