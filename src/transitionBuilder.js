const ident = x => x;
export const transitionBuilder = (count, step, loop) => {
  return ({animation, duration, easing = ident, delay = 0, done}) => {
    loop.setAnimationTimeout(() => {
      const updater = loop.setAnimationInterval(() => {
        if (count >= duration) {
          loop.removeAnimation(updater);
          !loop.animations.length && loop.stop();
          done && done();
        }
        animation(easing(count / duration));
        count += step;
      }, step);
    }, delay);
  };
};