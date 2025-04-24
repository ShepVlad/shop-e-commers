import { render, screen } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'

import BaseButton from '@/components/shared/BaseButton.vue'

describe('BaseButton', () => {
  it('renders with label', () => {
    render(BaseButton, {
      props: {
        label: 'Click me',
      },
    })
    expect(screen.getByRole('button').textContent).toContain('Click me')
  })

  it('applies primary class by default', () => {
    render(BaseButton, {
      props: {
        label: 'Primary',
      },
    })

    const button = screen.getByRole('button')
    expect(button.className).toMatch(/bg-primary/)
  })

  it('disables the button when `disabled` is true', () => {
    render(BaseButton, {
      props: {
        label: 'Disabled',
        disabled: true,
      },
    })

    const button = screen.getByRole('button')
    expect(button.className).toMatch(/cursor-not-allowed/)
  })
})
