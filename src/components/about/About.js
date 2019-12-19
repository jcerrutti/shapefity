import React from 'react';

import './About.css';

export default function About() {
  return (
    <div className="about-section">
      <h3>About Shapifity</h3>
      <p>
        Shapifity is a shape tool that lets you select 3 random points to draw a parallelogram and a
        circle with same area, on the center of it.
      </p>
      <p>
        Also, you can play around with the initial 3 points and move it, and you'll see how the
        shapes changes with the movement.
      </p>
      <p>Finally, there is a RESET button, that let you start over again on any moment.</p>

      <h4>Author: Juan Cerrutti</h4>
      <a href="https://github.com/jcerrutti" target="_blank">
        /github
      </a>
      <br />
      <a href="https://www.linkedin.com/in/juancerrutti/" target="_blank">
        /linkedin
      </a>
    </div>
  );
}
