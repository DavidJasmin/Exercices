function factoriel(n) {
  if(n == 0) {
    return 1
  }
  else {
    return factoriel(n-1)*n;
  }
}
