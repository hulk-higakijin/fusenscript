import { render } from '@testing-library/react'
import RoomCreateForm from 'components/Layouts/fusen/Room/CreateForm'

describe('RoomのCreateFormが', () => {
  test('機能すること', () => {
    const { getByText } = render(<RoomCreateForm />)
    expect(getByText('作成')).toBeTruthy()
  })
})
