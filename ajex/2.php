<h1>房价<?php echo 25000-15000;?>平？做梦吧。</h1>
<hr />
<p>
	
	出生年份：
	<select>
		<?php for($i = 1985;$i<=1999;$i++){?>
			<option><?php echo $i;?></option>
			<?php }?>
	</select>
</p>
<hr />
<?php 
	$verson = 8;
	echo 'iphone '.$verson.'plus';
?>
<?php 
	$beauty = '漂亮';
	function fun(){
		global $beauty;
		echo '我好'.$beauty;
	}
	fun();
	?>