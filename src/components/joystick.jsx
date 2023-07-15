import { styled } from 'styled-components'

const Container = styled.div`
  grid-column: 2;
  grid-row: 1/3;
  position: relative;
  width: 20rem;
  height: 20rem;
`

const Button = styled.button`
  all: unset;
  position: absolute;
  cursor: pointer;

  display: flex;

  top: ${({ top }) => top};
  bottom: ${({ bottom }) => bottom};
  right: ${({ right }) => right};
  left: ${({ left }) => left};
  transform: rotate(${({ rotate }) => rotate}) translate(-50%, -50%);
`

export const Joystick = ({ onClick }) => {
  const handleClick = (key) => {
    onClick(key)
  }
  return (
    <Container>
      <Button
        onClick={() => handleClick('ArrowRight')}
        rotate={'0deg'}
        top={'50%'}
        left={'100%'}
      >
        {Arrow()}
      </Button>
      <Button
        onClick={() => handleClick('ArrowDown')}
        rotate={'90deg'}
        top={'100%'}
        right={'50%'}
      >
        {Arrow()}
      </Button>
      <Button
        onClick={() => handleClick('ArrowLeft')}
        rotate={'180deg'}
        right={'100%'}
        bottom={'50%'}
      >
        {Arrow()}
      </Button>
      <Button
        onClick={() => handleClick('ArrowUp')}
        rotate={'270deg'}
        left={'50%'}
        bottom={'100%'}
      >
        {Arrow()}
      </Button>
    </Container>
  )
}

const Arrow = () => {
  return (
    <>
      <svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M43.2891 96.8203L43.7813 96.3984L80.4609 64.5234C81.7031 63.4453 82.4766 61.8281 82.4766 60.0234C82.4766 58.2188 81.6797 56.6016 80.4609 55.5234L43.8516 23.6719L43.2422 23.1328C42.6563 22.7344 41.9531 22.5 41.2031 22.5C39.1641 22.5 37.5 24.2344 37.5 26.3906V93.6094C37.5 95.7656 39.1641 97.5 41.2031 97.5C41.9766 97.5 42.7031 97.2422 43.2891 96.8203Z"
          fill="white"
        />
      </svg>
    </>
  )
}
