import { render } from '@testing-library/react'
import Navbar from 'components/Layouts/Navbar'

describe('Navbarコンポーネント', () => {
  test('が機能すること', () => {
    const { getByText } = render(<Navbar />)
    expect(getByText('FusenScript')).toBeTruthy()
  })
})
