export const simplifyNumber = num => {
  let amount = num.toString()

  switch (amount.length) {
    // thousands
    case 4:
      if (+amount[1] === 0) {
        return `${amount[0]}k`
      } else {
        return `${amount[0]}.${amount[1]}k`
      }

    case 5:
      if (+amount[2] === 0) {
        return `${amount[0]}${amount[1]}k`
      } else {
        return `${amount[0]}${amount[1]}.${amount[2]}k`
      }

    case 6:
      if (+amount[3] === 0) {
        return `${amount[0]}${amount[1]}${amount[2]}k`
      } else {
        return `${amount[0]}${amount[1]}${amount[2]}.${amount[3]}k`
      }

    // millions
    case 7:
      if (+amount[1] === 0) {
        return `${amount[0]}m`
      } else {
        return `${amount[0]}.${amount[1]}m`
      }

    case 8:
      return `${amount[0]}${amount[1]}m`

    case 9:
      return `${amount[0]}${amount[1]}${amount[2]}m`

    // billions
    case 10:
      if (+amount[1] === 0) {
        return `${amount[0]}b`
      } else {
        return `${amount[0]}.${amount[1]}b`
      }

    case 11:
      return `${amount[0]}${amount[1]}b`

    case 12:
      return `${amount[0]}${amount[1]}${amount[2]}b`

    default:
      return num
  }
}
