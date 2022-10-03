import { render } from '@testing-library/react'
import Room from 'components/Layouts/fusen/Room/Room'

describe('Roomコンポーネントが', () => {
  const room: Room = {
    id: '1',
    uid: 'room1',
    name: 'our first room',
    created_at: '2020/10/03',
  }

  test('機能すること', () => {
    const { getByText } = render(<Room {...{ room: room }} />)
    expect(getByText('our first room')).toBeTruthy()
  })
})
