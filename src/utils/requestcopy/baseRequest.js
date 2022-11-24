const dev = {
  appKey: "26162c1d37341be13d8d76fe07f38905",
  aesKey: "3cfYAl5HZmEwZTYxMzFjZDk1OWViZjcyNzVlOTJjNzg1NDE3NTE=4jRp6ddz",
  encData: false,
}

const pro = {
  appKey: "26162c1d37341be13d8d76fe07f38905",
  aesKey: "3cfYAl5HZmEwZTYxMzFjZDk1OWViZjcyNzVlOTJjNzg1NDE3NTE=4jRp6ddz",
  encData: false,
}

export default process.env.VUE_APP_RUN_DEV ? dev : pro;