import { FiSearch } from 'react-icons/fi'
import { useState, useRef } from 'react'
import { useRouter } from 'next/router'
import clsx from 'clsx'

export const SearchForm = ({ pron }: { pron: string }) => {
  const router = useRouter()
  const [inputValue, setInputValue] = useState('')
  const inputEl = useRef<HTMLInputElement>(null)

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    router.push(`/${inputValue}`).then(() => setInputValue(''))
  }

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value
    setInputValue(input)
    if (input.match(/^[ぁ-んー]{2,}$/)) {
      router.prefetch(`/${input}`)
    }
  }

  const formStyle = [
    'flex',
    'justify-center',
    'space-x-3',
    'max-w-md',
    'mx-auto',
    'relative',
  ]
  const buttonStyle = [
    'absolute',
    'aspect-square',
    'text-center',
    'text-xl',
    'rounded-full',
    'hover:bg-stone-200',
    'dark:hover:bg-stone-700',
    'right-0',
    'inset-y-0',
    'transition',
  ]

  return (
    <form onSubmit={submitHandler} className={clsx(formStyle)}>
      <input
        autoFocus
        ref={inputEl}
        aria-label="search kaomoji"
        type="text"
        value={inputValue}
        onChange={changeHandler}
        pattern="^[ぁ-んー]{2,}$"
        onBlur={() => setTimeout(() => inputEl.current?.focus(), 2500)}
        placeholder={pron ? pron : 'もち'}
        className="p-4 rounded-full bg-stone-100 border-transparent focus:border-stone-200 dark:focus:border-stone-700 focus:ring-0 flex-grow dark:bg-stone-800"
      />
      <button type="submit" className={clsx(buttonStyle)} aria-label="検索">
        <span className="flex justify-center">
          <FiSearch />
        </span>
      </button>
    </form>
  )
}
