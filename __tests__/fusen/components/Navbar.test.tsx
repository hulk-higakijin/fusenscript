import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { getPage } from 'next-page-tester'
import Navbar from 'components/Layouts/Navbar'

describe('Navbar', () => {
  // test('が機能すること', () => {
  //   const { getByText } = render(<Navbar />)
  //   expect(getByText('FusenScript')).toBeTruthy()
  // })

  test('1+1=2', () => {
    expect(1+1).toBe(2)
  })
})
